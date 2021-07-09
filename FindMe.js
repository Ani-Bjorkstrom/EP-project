//Bundling all of React's source code
import React, { Component } from 'react';
//React native uses React.js therefore both should be imported
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import MapView from 'react-native-maps';
//react-native-gesture-handler utilizes platforms native touch system instead of relying on the JS responder system.
import { ScrollView } from 'react-native-gesture-handler';


//Creates a class component called FindMe using alternative class syntax 
    class FindMe extends Component {
        //In states program saves property values that belong to the component, when state object changes component re-renders
        state = {
            data: [],
            errorMessage: '',
            location: {},
            curLongLat: {},
            polygon: [],
            clicked: false,
            region: {},
            isLoading: false,
            cityDistance: []            
            };   
            

            getCitiesFromApi = () => {
                return fetch('https://pgroute-staging.easyparksystem.net/cities')
                    //parsing the body text as json
                    .then((response) => response.json())
                    .then((json) => {
                    this.setState({data: json.cities});
                    })
                    .catch((error) => console.error(error))
                    .finally(() => {
                    this.setState({ isLoading: false });
                    });
                }   

            findCurrentLocationAsync = async () => {
                let location;
                let permissionStatus = null;
                let curLongLat;

                //Promise which in this case is that PermissionsAsync fullfills, the value will be returned and saved in status
                let { status } = Location.requestForegroundPermissionsAsync();
                permissionStatus = status;
                if (permissionStatus !== 'granted'){
                    this.setState({
                        errorMessage: 'Permission to access location was denied'
                        });
                        console.log("Permission to access location was denied")
                } 
                    //Pauses the code on this line until the promise fulfills: status is equal to granted                        
                    location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Lowest
                    });

                    let curLat = location.coords.latitude;
                    let curLong = location.coords.longitude;
                    curLongLat = {latitude: curLat, longitude: curLong};    
                

                this.setState({ 
                    location,
                    curLongLat   
                }) 
            };  


            drawPolygon = (event, item) => {
                
                let window = Dimensions.get('window');
                let { width, height }  = window;
                let LATITUD_DELTA = 0.19992;
                let LONGITUDE_DELTA = LATITUD_DELTA * (width / height);
                //Item is an array and split is a method of string, therfore first value of an array is used to convert it to a string
                //split method seperate string based on space and returns an array. For getting the first item 0 index is used
                let clickedCity = item[0].split(' ')[0];
                //defined it twice 
                let cities = this.state.data;
                //CityName is an array that consiste of the first name of the cities
                let cityName = cities.map(item => (item.name.split(" ")[0]));          
                let index = cityName.indexOf(clickedCity);
                let lat = cities[index].lat;
                let long = cities[index].lon;
                //Points for Odense equals to null
                let polygon = (cities[index].points === 'null') ? [{longitude: long, latitude: lat}] :
                cities[index].points.split(",").map(item=>({longitude: parseFloat(item.split(" ")[0]), latitude: parseFloat(item.split(" ")[1])}));

                let region = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUD_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
                let clicked = true;

                this.setState({
                    polygon,
                    region,
                    clicked
                })   
            }
            /*
            cityDistance = () => {
            //cities is an array that involves object containing the data
            let cities = this.state.data;
            //cityNames is an array that involves cities name and dush
            let cityNames = cities.map(item => ((item.name) + ' -')); 
            let cityDistance = []
            let longLat = [];
            //Pushes the {latitude: X, longtitude: Y} objects into longLat array which is the combination of latitudes and longtitues
            //longLat is an array that involves objects with lat and long values
            cities.map(item =>(longLat.push({latitude: item.lat, longitude: item.lon})));
            //Creates an array that involves distances
            let distance = longLat.map(item => (getDistance(this.state.curLongLat, item)));
            //Returns an array that consists of arrays that includes city name and distance from the current location
            for (let i = 0; i < distance.length; i++ ){
                cityDistance.push([cityNames[i] + ' ' + distance[i]/1000 + 'km']);
            }
            this.setState({
                    cityDistance
                })

            }
            */
        render() {
        
            //cities is an array that involves object containing the data
            let cities = this.state.data;
            //cityNames is an array that involves cities name and dush
            let cityNames = cities.map(item => ((item.name) + ' -')); 
            let cityDistance = []
            let longLat = [];
            //Pushes the {latitude: X, longtitude: Y} objects into longLat array which is the combination of latitudes and longtitues
            //longLat is an array that involves objects with lat and long values
            cities.map(item =>(longLat.push({latitude: item.lat, longitude: item.lon})));
            //Creates an array that involves distances
            let distance = longLat.map(item => (getDistance(this.state.curLongLat, item)));
            //Returns an array that consists of arrays that includes city name and distance from the current location
            for (let i = 0; i < distance.length; i++ ){
                cityDistance.push([cityNames[i] + ' ' + distance[i]/1000 + 'km']);
            }
            
            return (
        
                    <View 
                    onLayout={this.getCitiesFromApi}
                    style={styles.container}>
                       
                        {/* Show the map only when city name is clicked */}
                        {this.state.clicked && <MapView 
                        minZoomLevel={9}
                        maxZoomLevel = {16}   
                        showsUserLocation= { true } 
                        scrollEnabled={ true }
                        zoomEnabled={ true }
                        annotations={ this.state.mapAnnotations }
                        style={styles.map}
                        region={this.state.region}>
                        
                            <MapView.Polygon coordinates={
                                this.state.polygon
                            } 
                                fillColor="rgba(0, 200, 0, 0.5)"
                                strokeColor="#992b82"
                                strokeWidth={2}
                                /> 
                        </MapView>} 

                        <Text 
                        onLayout={this.findCurrentLocationAsync}  
                        style={styles.text}>
                            MY DISTANCE FROM EP CITIES
                        </Text>

                        <ScrollView> 
                            {cityDistance.map(item => (<Text style={styles.container} onPress={ (e)=> this.drawPolygon(e, item)} key={item}>{(item)}</Text>))}
                        </ScrollView> 
                    </View> 
                        
            );
        }
    }

const styles = StyleSheet.create({
    container: {
        fontSize: 20,
        color: '#992b82',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:'Times New Roman',
        paddingLeft: 10,
        marginTop: 5,
        marginLeft: 5,
        textDecorationLine: 'underline', 
    },

    map: {

        flex: 0,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center', 
        width: Dimensions.get('window').width*1.06,
        height: Dimensions.get('window').height*8.3,
        maxHeight: 300,
        minWidth: 400
    },    

    text: {
        color: '#f1287e',
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        fontSize: 20,
        justifyContent: 'center',
        textAlign:'center',
        paddingTop: 50,
        paddingBottom: 20    
    }
});

export default FindMe;
