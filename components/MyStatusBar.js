import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

const MyStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight }} >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default MyStatusBar