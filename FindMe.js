import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, Button, Linking, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as appJson from './data.json';
import { getDistance } from 'geolib';
import MapView, {Polygon, Polyline} from 'react-native-maps';
import { event } from 'react-native-reanimated';

let cities = appJson.cities;




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
            cities[index].points.split(",").map(item=>({longitude: (item.split(" ")[0]).replace(/['"]+/g, ' '), latitude: (item.split(" ")[1]).replace(/['"]+/g, ' ')}))
            
            console.log(cities[index].points.split(",").map(item=>({longitude: item.split(" ")[0], latitude: item.split(" ")[1]})));
            //let Points = cities.map(item => (item.points.replace(/[',]+/g, ' ')));
            //console.log(Points[index]);
            //let clickedPoints = [Points[index]][0].replace(/['"]+/g, '').split(" ").reverse();
            //console.log(clickedPoints);
            /*
            console.log([clickedPoints[index]][0].replace(/['"]+/g, '').split().reverse());
            console.log(clickedPoints.split().reverse());
            
            console.log([Points[index]][0].replace(/['"]+/g, '').replace(/[',]+/g, ' ').replace(/[' ]+/g, ','));
            
            let polygon = [
               
            {longitude: 17.97791823188437, latitude: 59.31329989421945},
            {longitude: 18.00487876058698, latitude: 59.31890230426627},
            {longitude: 18.02793799398348, latitude: 59.31364854460676},
            {longitude: 18.07942264600009, latitude: 59.30229813459571},
            {longitude: 18.08595488372055, latitude: 59.30229813459571}
            /*
            {latitude: 59.31364854460676, longitude: 18.02793799398348},
            {latitude: 59.30229813459571, longitude: 18.07942264600009},
            
            {latitude: 59.29851748938571, longitude: 18.08595488372055},
            {latitude: 59.29936946846362, longitude: 18.10585155135719},

            {latitude: 59.30419602178423, longitude: 18.11721389794955},
            {latitude: 59.31687564733727, longitude: 18.11106729310467},
            {latitude: 59.32171481190725, longitude: 18.07720428503221},
            {latitude: 59.30229813459571, longitude: 18.07942264600009},
            {latitude: 59.32907204878743, longitude: 18.08406402837167},
            {latitude: 59.32906900667979, longitude: 18.10461656034975}
          
        
    ]
      */

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
                     /*
                     initialRegion={{
                        //automate it
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,  
                      }}
                      */>
                          
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
          height: 200,
        },
      });
   //default means that only FindMe can be exported from this module 
    export default FindMe;

    
   