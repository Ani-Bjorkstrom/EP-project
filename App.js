import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import FindMe from './FindMe';


export default class App extends Component {
  
  render(){
  
    return (

      <ScrollView>
    
        <View style={{justifyContent: 'center'}}>

          <Text style={{color: '#f1287e',
              fontWeight: 'bold',
              fontFamily: 'Arial',
              fontSize: 15,
              textAlign:'center',
              paddingTop: 40}}>
            My distance from EasyPark cities        
          </Text>
    
          <Image
              source={require('./assets/search.png')}
              style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 20 }}
            />
          <FindMe  />
        </View>
  
      </ScrollView> 
  ); 
}
};

