// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/home';
import DetailsScreen from './src/details';


const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home" 
          screenOptions={{
            headerTitleAlign: "center"
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen}   options={{ title: 'ENQUIRIES' }}/>
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}

export default App;