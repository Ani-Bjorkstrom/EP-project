import { floor } from 'react-native-reanimated';
//import * as MediaLibrary from 'expo-media-library';
//import * as Permissions from 'expo-permissions';
        /*
        fetchDistanceBetweenPoints = (lat1, lng1, lat2, lng2) => {
            let urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+lat1+','+lng1+'&destinations='+lat2+'%2C'+lng2+'&key=' + 'AIzaSyBZcm6gFaJcSEmLrddFuSw6gQCC0QRn1ZI'; 
            fetch(urlToFetchDistance)
                .then(res => {return res.json()})
                .then(res => {
            distanceString = res.rows[0].elements[0].distance.text;
        })

        .catch(error => {
            console.log("Problem occurred");
        });
    
        }
        */


//this.fetchDistanceBetweenPoints(59.339475,18.005875,38.91835, -6.345305);
            //for(let i = 0; i < cityLat.length; i++){
                
            //}

import React, { useState, useEffect } from 'react';            
//hooks can only be used in function components
            function FindMyLocation(){
                const [latitude, getLatitude] = useState(null);
                const [longtitude, getLongtitude] = useState(null);
                const [errorMsg, setErrorMsg] = useState(nul);
//useEffect starts with an array function that returns an assync function that on it's turn return
                useEffect( () => {
                    (async () => {
                        let { status } = await Location.requestForegroundPermissionsAsync();
                        if (status !== 'granted') {
                            setErrorMsg('Permission to access location was denied');
                            console.log(setErrorMsg);
                            return;
                        }
//make latitude a global variable
                        let latitude = await Location.getCurrentPositionAsync({}).coords.latitude;
                        //every time dom randers because of the state change setLatitude will get the new value of latitude
                        setLatitude(latitude);
                        let longtitude = await Location.getCurrentPositionAsync({}).coords.longtitude;
                        //every time dom randers because of the state change setLatitude will get the new value of latitude
                        setLongtitude(longtitude);

                    })
                })
            }
    //My assumtion is that when I call the FindMyLocation component in a render <FindMyLocation/> the global latitude and longtitude 
    //vlue will get thier values
    //Questions why are longtitude and latitude defined twise
    //Can I create default variable by declaring them outside the component however giving them the value in the component
    //why is status defined in curly braces
    //should async function be iffe
/*
        findCurrentLocation = () => {
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = JSON.stringify(position.coords.latitude);
                    const longtitude = JSON.stringify(position.coords.longitude);

                    this.setState({
                        latitude,
                        longtitude
                    });
                },
                error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        };
       
        componentDidMount(){
           
        }
      
        

        findCurrentLocationAsync = async () => {
            //promise which in this case is Permissions.askAsync fullfills, the value will be returned and saved in status
            const { status } = await MediaLibrary.getAssetInfoAsync(Location);
           
                
            if (status !== 'granted'){
                console.log({ status } )
                this.setState({
                    errorMessage: 'Permission to access location was denied'
                    });
                    }
            
            const location = await MediaLibrary.getAssetInfoAsync('location');
            const curLat = location.latitude;
            const curLong = location.longitude;
    
            this.setState({ 
                location,
                curLong,
                curLat
                });
        };


        findCurrentLocationAsync = async () => {

            let permissionStatus = null;
            //promise which in this case is Permissions.askAsync fullfills, the value will be returned and saved in status
            if(Platform.OS === 'ios'){


                let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
                //let { status } = await MediaLibrary.getAssetInfoAsync(Location);
                permissionStatus = status;
            } else {
             
                navigator.permissions.query({name:'geolocation'}).then(function(result) {
                permissionStatus = result.state;    
                    })
            }    
            
            if (permissionStatus !== 'granted'){
                
                this.setState({
                    errorMessage: 'Permission to access location was denied'
                    });
                    }
            
            const location = await Location.getCurrentPositionAsync({});
            const curLat = location.coords.latitude;
            const curLong = location.coords.longitude;
    
            this.setState({ 
                location,
                curLong,
                curLat
                });
        };
    */    
        function calDistance(){
            let d;
            let a;
            let c;
            //Defining toRad function
            function toRad(value){ 
                return value * Math.PI / 180;
            }
            for(let i = 0; i < cityLat.length; i++){
                //console.log(cityLat[i]);
                let cityLatI = cityLat[i];
                let cityLongI = cityLong[i];
        
                (function calcCrow(cityLatI, cityLongI, curLat, curLong) {
                
                    var R = 6371;
                    var dLat = toRad(curLat-cityLatI);
                    var dLon = toRad(curLong-cityLongI);
                    var lat1 = toRad(cityLatI);
                    var lat2 = toRad(curLat);
                
                    a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
                    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                    d = R * c;
                    return d;
                    console.log(a); 
                  
                
                })();
                
            }
                console.log(a);
                console.log(c);
                console.log(d);
        }

        return (
            <View>
                
                    <Text>My distance from EP cities</Text>
                    //<EpCities name = {cities.name} />
                    {cityDistance.map(item => (<Text>{(item)}</Text>))}
                    //{cities.map(item =>(<Text>{(item.name) + ' -' }</Text>))} 
                    //{distance.map(item=>(<Text>{(item/1000) + ' km'}</Text>))}


            </View>
/*
<MapView>
<Polyline
    coordinates={[
        {latitude: 17.97791823188437, longitude: 59.31329989421945},
        {latitude: 18.00487876058698, longitude: 59.31890230426627},
        {latitude: 18.02793799398348, longitude: 59.31364854460676},
        {latitude: 18.07942264600009, longitude: 59.30229813459571},
        {latitude: 18.08595488372055, longitude: 59.29851748938571},
        {latitude: 18.10585155135719, longitude: 59.29936946846362}
    ]}
    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
    strokeColors={[
        '#7F0000',
        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
        '#B24112',
        '#E5845C',
        '#238C23',
        '#7F0000'
    ]}
    strokeWidth={6}
/>

</MapView> 

                                {latitude: 17.97791823188437, longitude: 59.31329989421945},
                                {latitude: 18.00487876058698, longitude: 59.31890230426627},
                                {latitude: 18.02793799398348, longitude: 59.31364854460676},
                                {latitude: 18.07942264600009, longitude: 59.30229813459571},
                                {latitude: 18.08595488372055, longitude: 59.29851748938571},
                                {latitude: 18.10585155135719, longitude: 59.29936946846362}

*/

//Doing it in google

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Component } from 'react/cjs/react.production.min';
import { styleSheets } from 'min-document';

export default class App extends Component {
    render(){
        return(
            <View>
                <MapView
                provider = {PROVIDER_GOOGLE}
                style = {styleSheets.map}
                initialRegion = 
            </View>
        )
    }
}

                
                /*
                {latitude: 17.97791823188437, longitude: 59.31329989421945},
                {latitude: 18.00487876058698, longitude: 59.31890230426627},
                {latitude: 18.02793799398348 , longitude: 59.31364854460676},
                {latitude: 18.07942264600009, longitude: 59.30229813459571},
                {latitude: 18.08595488372055, longitude: 59.29851748938571},
                {latitude: 18.10585155135719, longitude: 59.29936946846362}
                */
               </View>



               {latitude: 59.31329989421945, longitude: 17.97791823188437},
                {latitude: 59.31890230426627, longitude: 18.00487876058698},
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

                class FindMe extends Component {
        
                    //in states program saves property values that belong to the component, when state object changes component re-renders
                    state = {
                        errorMessage: '',
                        location: {},
                        curLongLat: {},
                        polygon: [17.97791823188437, 59.31329989421945, 18.00487876058698, 59.31890230426627, 18.02793799398348, 59.31364854460676]           
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
                            
                            let polygon = [
                                17.97791823188437, 59.31329989421945, 18.00487876058698, 59.31890230426627, 18.02793799398348, 59.31364854460676
                            ]
                            
            
                        this.setState({ 
                            location,
                            curLongLat,
                            polygon
                            })
                        };    
                    };  
            
            
            
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
            
                                    <MapView.Polygon coordinates= {this.state.polygon}
                                    
                                        fillColor="rgba(0, 200, 0, 0.5)"
                                        strokeColor="red"
                                        strokeWidth={2}
                                        />
                                </MapView>   
                                    <Button onPress={this.findCurrentLocationAsync} 
                                     title = "My distance from EP cities" color="#841584"/>
                                     
                                    {cityDistance.map(item => (<Text onPress={ ()=> Linking.openURL('https://google.com') } key={item[0]}>{(item)}</Text>))}
            
            
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
      
     
    <MapView.Circle
    center = {{
        latitude: 18.005875,
        longtitude: 59.339475,
    }}
    radius = {50000}

 /> 

 */

 //Helt fungerance code

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
            polygon: [],
            region: {
                latitude: 59.339475,
                longitude: 18.005875,
                latitudeDelta: LATITUD_DELTA,
                longitudeDelta: LONGITUDE_DELTA,  
            }            
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
/*
        showMap = () => {

            let region = {
                latitude:
                longitude:
                latitudeDelta:
                longitudeDelta: 
            }
            this.setState({
                region
            })
        }
*/
        drawPolygon = (event, item) => {
            
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
          height: Dimensions.get('window').height*0.5,
        },
      });
   //default means that only FindMe can be exported from this module 
    export default FindMe;

    
   