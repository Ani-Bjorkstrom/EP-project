import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, Button, Linking, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as appJson from './data.json';
import { getDistance } from 'geolib';
import MapView, {Polygon, Polyline} from 'react-native-maps';
import { event, log } from 'react-native-reanimated';


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



//here I use the alternative class suntax
//creates a class component called FindMe gives the class component a state object, state object can be only created in class constructor
    class Polygon extends Component {
        
        //in states program saves property values that belong to the component, when state object changes component re-renders
        state = {
            data: [],
            errorMessage: '',
            location: {},
            curLongLat: {},
            polygon: [],
            region: {}            
            };   
            drawPolygon = (this.props.event, this.props.item) => {
            
                let clickedCity = item[0].split(' ')[0];
                //console.log(clickedCity);
                //console.log(cityName);
                
                let index = cityName.indexOf(clickedCity);
                console.log(index);
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
                
                console.log(cities[index].points.split(",").map(item=>({longitude: (item.split(" ")[0]), latitude: (item.split(" ")[1])})));
                console.log(cities[index].points.split(",").map(item=>({longitude: parseFloat(item.split(" ")[0]), latitude: parseFloat(item.split(" ")[1])})));
    
    
                this.setState({
                    polygon,
                    region
                })
    }
            

render() {
    return(
        <MapView 
            showsUserLocation= {true}  
            style={styles.map}
            region={this.state.region}
            /*
            initialRegion={{
            //automate it
            
            latitude: 59.339475,
            longitude: 18.005875,
            latitudeDelta: LATITUD_DELTA,
            longitudeDelta: LONGITUDE_DELTA,  
            }}
            */
            >

            <MapView.Polygon coordinates={
                this.state.polygon
            } 
                fillColor="rgba(0, 200, 0, 0.5)"
                strokeColor="red"
                strokeWidth={2}
                />
        </MapView> 

)}