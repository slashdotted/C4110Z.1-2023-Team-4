import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert , FlatList, Image} from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from "axios";
import Weather from "./Weather";


var runningStatus = false;

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.rectangleBorder}>
        <Text style={[styles.topText, { marginTop: 10, textAlign: 'center' }]}>Welcome to SafeSki! {"\n"} The current resort selected is: </Text>      
      </View>
      <TouchableOpacity style={styles.rectangleBox}
      onPress={() => {
        navigation.navigate('Resort', {name: 'Resort'})
      }}
      >
      <Image source={require('./assets/splugen_logo.png')} style={styles.splugenLogo} /> 
    </TouchableOpacity>
      <Text style={[styles.blueText, { height: 50, marginTop: 50 }]}>START TRACKING</Text>     
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() =>{
          runningStatus = !runningStatus;
          navigation.navigate('Resort', { name: 'Resort' })
        }
        }>
      <Image source={require('./assets/icon.png')} style={styles.logo} /> 
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomItem}
          onPress={() =>
            navigation.navigate('Resort', { name: 'Resort' })
          }>
          <Text style={styles.bottomText}>Resort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomItem}
        >
        <Image source={require('./assets/icon.png')} style={styles.logoBottom} /> 
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomItem}
          onPress={() =>
            navigation.navigate('EmergencyNumbers', { name: 'Emergency Numbers' })
          }>
          <Text style={styles.bottomText}>Emergency Numbers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ResortScreen({ navigation }) {
  const [resorts, setResorts] = useState([
    {resortName:'Splügen', key:'1'},
    {resortName:'Lenzerheide', key:'2'},
    {resortName:'Lenzerheide', key:'3'},
  ]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={resorts}
        renderItem={
          ({item}) => (
            <TouchableOpacity style={styles.rectangleBox}
            onPress={() => {
              navigation.navigate('SplugenResortScreen', {name: 'SplugenResortScreen'})
            }}
            >
              <Image source={require('./assets/splugen_logo.png')} style={styles.splugenLogo} /> 
              <Text>{item.resortName}</Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

function EmergencyNumbersScreen({ navigation }) {
  const [emergencyNumbers, setEmergencyNumbers] = useState([
    {number:'1414', service:'Rega', key:'1'},
  ]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={emergencyNumbers}
        renderItem={
          ({item}) => (
            <View>
            <Text>Service: {item.service}</Text>
            <TouchableOpacity
              onPress={() => (Alert.alert('Calling Emergency Service', 'The service '+item.service+' is being called',
              [{text:'Dismiss', onPress: () => (console.log('°Dismissed'))}]))}
            >
              <Text>Call: {item.number}</Text>
            </TouchableOpacity>
          </View>
        )
        }
      />
    </View>
  );
}

function SplugenResortScreen({ navigation }) {

  return (
    <View>
      <Weather lat={46.5528} lon={9.3234}/>
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

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [oldData, setOldData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setOldData(data); // save the current data as old data
      setData(accelerometerData); // update the current data
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const acceleration = Math.sqrt(
    Math.pow(data.x, 2) + Math.pow(data.y, 2) + Math.pow(data.z, 2)
  );

  const handleAlert = () => {
    const threshold = 2.5; // set the threshold for difference between old and new values
    const delta = Math.abs(acceleration - Math.sqrt(
      Math.pow(oldData.x, 2) + Math.pow(oldData.y, 2) + Math.pow(oldData.z, 2)
    ));
    if (delta > threshold && runningStatus) {
      Alert.alert('Accident Detected', `Calling the nearest Emergency Service in 30 seconds`, [{ text: 'Cancel' }]);
    }
  }

  useEffect(() => {
    handleAlert();
  }, [data]); // trigger the alert every time the accelerometer data updates


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: () => (
            <Image
              source={require('./assets/banner.png')}
              style={styles.banner}
            />
          ), 
          headerStyle: { height: 130 },
          headerTitleAlign: 'center',
        }}
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
        <Stack.Screen
          name="Splügen"
          component={SplugenResortScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    alignContent: 'center',
  },
  roundButton: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 0x73c2c9,
    marginTop: 30,
  },
  whiteText: {
    color: 'white',
    fontSize: 48,
  },
  blueText: {
    color: 0x73c2fb,
    fontSize: 35,
    fontFamily: 'Roboto',
  },
  topContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
    height: '10%',
    width: '100%',
    color: 'black',
    fontSize: 18,
    marginTop: 0,
  },
  logo: {
    width: 115,
    height: 100,
    marginTop: -20,
  },
  logoBottom: {
    width: 70,
    height: 60,
  },
  bottomBar: {
    bottom: 0,
    marginBottom:0,
    position:'absolute',
    flexDirection:'row',
  },
  bottomItem: {
    justifyContent:'space-evenly',
    alignContent:'center',
    borderColor:'black',
    borderWidth:1,
    flex:1,
    alignItems:'center',
    height:100,
  },
  bottomText: {
    fontSize: 16,
    marginTop: 30,
  },

  topText: {
    fontSize: 20,
    color: 0x73c2fb,
  },
  rectangleBox: {
    backgroundColor: 0x73c2c9,
    height: 110,
    width: 370,
    padding: 3,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  rectangleBorder:{
    borderWidth: 3,
    borderColor: 0x73c2c9,
    height: 90,
    width: 330,
    padding: 3,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 20,
    marginTop: 0,
  },
  boxImage: {
    width: 250,
    height: 120,
  },
  splugenLogo:{
    width: 250,
    height: 100,
  },
  banner: {
    height: 55,
    width: 340,
  }
});
