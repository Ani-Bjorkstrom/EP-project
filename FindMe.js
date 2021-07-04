import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import MapView from 'react-native-maps';



const window = Dimensions.get('window');
console.log(window);
const { width, height }  = window;
const LATITUD_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUD_DELTA * (width / height)
console.log(window);
console.log(width, height, LATITUD_DELTA, LONGITUDE_DELTA);



//here I use the alternative class suntax
//creates a class component called FindMe gives the class component a state object, state object can be only created in class constructor
    class FindMe extends Component {
        
        //in states program saves property values that belong to the component, when state object changes component re-renders
        state = {
            data: [],
            errorMessage: '',
            location: {},
            curLongLat: {},
            polygon: [],
            clicked: false,
            region: {
                latitude: 59.339475,
                longitude: 18.005875,
                latitudeDelta: LATITUD_DELTA,
                longitudeDelta: LONGITUDE_DELTA,  
            }            
            };   
            
            getCitiesFromApi = () => {
                return fetch('https://pgroute-staging.easyparksystem.net/cities')
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

                //promise which in this case is Permissions.askAsync fullfills, the value will be returned and saved in status
                let { status } = await Location.requestForegroundPermissionsAsync();
                permissionStatus = status;
                if (permissionStatus !== 'granted'){
                    this.setState({
                        errorMessage: 'Permission to access location was denied'
                        });
                        console.log("Permission to access location was denied")
                } else {
                    
                    location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Lowest
                    });
                    let curLat = location.coords.latitude;
                    let curLong = location.coords.longitude;
        
                    curLongLat = {latitude: curLat, longitude: curLong}; 
                    
                }

            
                //Variable that is inserted into state should be globally declared    
                this.setState({ 
                    location,
                    curLongLat
                    
                    }) 
            };  


            drawPolygon = (event, item) => {
                
                let clickedCity = item[0].split(' ')[0];
                let cities = this.state.data;
                let cityName = cities.map(item => (item.name));                
                let index = cityName.indexOf(clickedCity);
                let polygon = 
                cities[index].points.split(",").map(item=>({longitude: parseFloat(item.split(" ")[0]), latitude: parseFloat(item.split(" ")[1])}))
                let lat = cities[index].lat;
                console.log(lat, long);
                let long = cities[index].lon;
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
        
        


        render() {

            //Creates an empathy array
            let cities = this.state.data;
            let cityNames = cities.map(item => ((item.name) + ' -')); 
            let cityDistance = []
            let longLat = [];
            //Pushes the {latitude: X, longtitude: Y} objects into longLat array which is the compination of five latitudes and longtitues
            cities.map(item =>(longLat.push({latitude: item.lat, longitude: item.lon})));
            //Creates an array that involves distances
            let distance = longLat.map(item => (getDistance(this.state.curLongLat, item)));
            //Returns an array that consists of arrays that includes city name and distance from the current location
            for (let i = 0; i < distance.length; i++ ){
                cityDistance.push([cityNames[i] + ' ' + distance[i]/1000 + 'km']);
            }


            
            return (

                <View onLayout={this.getCitiesFromApi}>
                    {/* Show the map only when city name is clicked */}
                    {this.state.clicked && <MapView 
                     showsUserLocation= {true}  
                     style={styles.map}
                    region={this.state.region}>

                        <MapView.Polygon coordinates={
                            this.state.polygon
                        } 
                            fillColor="rgba(0, 200, 0, 0.5)"
                            strokeColor="red"
                            strokeWidth={2}
                            />
                    </MapView>} 
                        <Text onLayout={this.findCurrentLocationAsync}>
                        
                        </Text>


                        {cityDistance.map(item => (<Text onPress={ (e)=> this.drawPolygon(e, item)} key={item}>{(item)}</Text>))}


                </View>

            );
        }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        map: {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height/2,
        },
      });

    
   //default means that only FindMe can be exported from this module 
    export default FindMe;

    
   