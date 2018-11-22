/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React ,{ Component } from 'react';
import { View, Text, Button,AppRegistry,Platform} from 'react-native';
import { createStackNavigator,createNavigationContainer} from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen,},
  Details: { screen: DetailsScreen, },
},{
   headerMode:"none",
   mode: Platform.OS ==='ios'?'modal':'card',
   navigationOptions:{
     gesturesEnabled:false
   }
}
);

export default createNavigationContainer(AppNavigator);