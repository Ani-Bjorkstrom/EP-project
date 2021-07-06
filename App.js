import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
