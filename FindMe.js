import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as appJson from './data.json';
import { getDistance } from 'geolib';
let cities = appJson.cities;

//returns an array with city names -
let cityNames = cities.map(item => ((item.name) + ' -')); 


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
            curLongLat: {}
            };   
    
        findCurrentLocationAsync = async () => {
            let permissionStatus = null;
            //promise which in this case is Permissions.askAsync fullfills, the value will be returned and saved in status
            let { status } = await Location.requestForegroundPermissionsAsync();
            permissionStatus = status;
            if (permissionStatus !== 'granted'){
                this.setState({
                    errorMessage: 'Permission to access location was denied'
                    });
                    console.log("Permission to access location was denied")
            } else {
                const location = await Location.getCurrentPositionAsync({});
                let curLat = location.coords.latitude;
                let curLong = location.coords.longitude;
    
                let curLongLat = {latitude: curLat, longitude: curLong}; 

            this.setState({ 
                location,
                curLongLat
                })
            };    
        };  


//Click event that doesn't work
        showMap = () => {
            <Text>Hi</Text>
        }

        render() {

            //Sets the value for locations 
            this.findCurrentLocationAsync();
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
                    
                        <Text>My distance from EP cities</Text>
                        {cityDistance.map(item => (<Text key={item[0]} onClick={this.showMap}>{(item)}</Text>))}


                </View>
            );
        }
    }

   //default means that only FindMe can be exported from this module 
    export default FindMe;

    
   