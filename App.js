import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/EvilIcons';
import FindMe from './FindMe';


export default class App extends Component {
  
  render(){
  
    return (


         
      <FindMe  />
        
        
      
  ); 
}
};

const styles = StyleSheet.create({
  container: {
              color: '#f1287e',
              fontWeight: 'bold',
              fontFamily: 'Times New Roman',
              fontSize: 20,
              justifyContent: 'center',
              textAlign:'center',
              paddingTop: 60}
            });
