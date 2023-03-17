import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Start"
        onPress={() =>
          navigation.navigate('Resort', { name: 'Resort' })
        }
      />
      <Button
        title="Emergency Numbers"
        onPress={() =>
          navigation.navigate('EmergencyNumbers', { name: 'Emergency Numbers' })
        }
      />
      <Button
        title="Resorts"
        onPress={() =>
          navigation.navigate('Resort', { name: 'Resort' })
        }
      />
    </View>
  );
}

function ResortScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Resort 1"
      />
      <Button
        title="Resort 2"
      />
      <Button
        title="Resort 3"
      />
    </View>
  );
}

function EmergencyNumbersScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TODO: ADD EMERGENCY NUMBERS</Text>
    </View>
  );
}

const Stack = createStackNavigator();


/*
export default function App() {
  const [data, setData] = useState({});
  
  useEffect(() => {
    _subscribe();
  }, []);

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };
  
  let { x, y, z } = data;

  const getAcceleration = (ax, ay, az) => {
    return Math.sqrt(ax*ax+ay*ay+az*az);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>SKI ACCIDENT DETECTOR</Text>
      </View>
      <TouchableOpacity
        style={styles.roundButton}>
        <Text style={styles.whiteText}>START</Text>
      </TouchableOpacity>
      <View style={styles.topContainer}>
        <Text>SKI ACCIDENT DETECTOR</Text>
      </View>
    </View>
  );
};
*/
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'SKI ACCIDENT DETECTION' }}
        />
        <Stack.Screen
          name="Resort"
          component={ResortScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="EmergencyNumbers"
          component={EmergencyNumbersScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
/* 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    alignContent:'center',
  },
  roundButton: {
    top:'30%',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    borderWidth: 6,
    backgroundColor: 'black',
    borderColor: 'red',
  },
  whiteText: {
    color: 'white',
    fontSize: 48,
  },
  topContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    alignContent:'center',
    height:'10%',
    width:'100%',
    color:'black',
    fontSize:18,
    marginTop:0
  },
});*/
