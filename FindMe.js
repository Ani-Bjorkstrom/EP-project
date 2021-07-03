import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, Button, Linking, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as appJson from './data.json';
import { getDistance } from 'geolib';
import MapView, {Polygon, Polyline} from 'react-native-maps';
import { event } from 'react-native-reanimated';

let cities = appJson.cities;

const window = Dimensions.get('window');
console.log(window);
const { width, height }  = window;
const LATITUD_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUD_DELTA * (width / height)
console.log(window);
console.log(width, height, LATITUD_DELTA, LONGITUDE_DELTA);



//returns an array with city names -
let cityNames = cities.map(item => ((item.name) + ' -')); 
let cityName = cities.map(item => (item.name)); 


//Creates a global array
let longLat = [];
//Pushes the {latitude: X, longtitude: Y} objects into longLat array which is the compination of five latitudes and longtitues
cities.map(item =>(longLat.push({latitude: item.lat, longitude: item.lon})));


//Currently not used

//Returns an array of city lats
let cityLat = cities.map(item => ( item.lat ));
//Return an array of city long
let cityLong = cities.map(item => ( item.lon));

//Creates a property EpCities that returns list of city names
const EpCities = (props) => {
    return(
      cities.map((obj) => (
        <Text key={obj.name}>{obj.name}{' - '}</Text>     
     ))
    )
}
//here I use the alternative class suntax
//creates a class component called FindMe gives the class component a state object, state object can be only created in class constructor
    class FindMe extends Component {
        
        //in states program saves property values that belong to the component, when state object changes component re-renders
        state = {
            errorMessage: '',
            location: {},
            curLongLat: {},
            polygon: []            
            };   
            
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
                location = await Location.getCurrentPositionAsync({});
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
            //console.log(clickedCity);
            //console.log(cityName);
            
            let index = cityName.indexOf(clickedCity);
            console.log(index);
            let polygon = 
            cities[index].points.split(",").map(item=>({longitude: (item.split(" ")[0]).replace(/['"]+/g, ''), latitude: (item.split(" ")[1]).replace(/['"]+/g, '')}))
            
            console.log(cities[index].points.split(",").map(item=>({longitude: item.split(" ")[0], latitude: item.split(" ")[1]})));


            this.setState({
                polygon
            })
}
    
    


        render() {
            //const { polygon } = this.state.polygon;
            //Sets the value for locations 
            //this.findCurrentLocationAsync();
            //Creates an empathy array
            let cityDistance = []
            //Creates an array that involves distances
            let distance = longLat.map(item => (getDistance(this.state.curLongLat, item)));
            //Returns an array that consists of arrays that includes city name and distance from the current location
            for (let i = 0; i < distance.length; i++ ){
                cityDistance.push([cityNames[i] + ' ' + distance[i]/1000 + 'km']);
            }


            
            return (

                

                <View>
                    <MapView
                        
                     style={styles.map}
                     
                     initialRegion={{
                        //automate it
                        latitude: 38.91835,
                        longitude: -6.345305,
                        latitudeDelta: LATITUD_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,  
                      }}
                       >
                         <MapView.Circle
                            center = {{
                                latitude: 18.005875,
                                longtitude: 59.339475,
                            }}
                            radius = {50000}

                         /> 
                        <MapView.Polygon coordinates={
                            this.state.polygon
                        } 
                            fillColor="rgba(0, 200, 0, 0.5)"
                            strokeColor="red"
                            strokeWidth={2}
                            />
                    </MapView>   
                        <Button onPress={this.findCurrentLocationAsync} 
                         title = "My distance from EP cities" color="#841584"/>

                        {cityDistance.map(item => (<Text onPress={ (e)=> this.drawPolygon(e, item) } key={item}>{(item)}</Text>))}


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
          height: Dimensions.get('window').height,
        },
      });
   //default means that only FindMe can be exported from this module 
    export default FindMe;

    
   