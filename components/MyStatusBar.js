import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

/**
 * MyStatusBar wraps the React-native-statusbar-component to void a overlapping 
 * of the phones-statusbar and the app-content. The component based on the 
 * statusbar-component created in de 'UdaciFitness'-project by Udacity
 */
const MyStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight }} >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default MyStatusBar