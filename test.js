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