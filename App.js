import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert , FlatList, Image} from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.topText, { marginTop: 10, textAlign: 'center' }]}>Welcome to SafeSki! {"\n"} The current resort selected is: </Text>      
      <TouchableOpacity style={styles.rectangleBox}>
      <Text style={styles.boxText}>Splügen</Text>
      <Image source={require('./assets/splugen_map.jpg')} style={styles.boxImage} /> 
    </TouchableOpacity>
      <Text style={[styles.blueText, { height: 50, marginTop: 30 }]}>START TRACKING</Text>     
      <TouchableOpacity
        style={[styles.roundButton, { marginTop: 25 }]}
        onPress={() =>
          navigation.navigate('Resort', { name: 'Resort' })
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
    {resortName:'Lenzerheide', key:'1'},
    {resortName:'Lenzerheide', key:'2'},
    {resortName:'Lenzerheide', key:'3'},
  ]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={resorts}
        renderItem={
          ({item}) => (
            <TouchableOpacity>
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

  /*const [data, setData] = useState({});

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
    return Math.sqrt(ax * ax + ay * ay + az * az);
  };*/

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
  },
  whiteText: {
    color: 'white',
    fontSize: 48,
  },
  blueText: {
    color: 0x73c2fb,
    fontSize: 40,
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
    width: 100,
    height: 100,
  },
  logoBottom: {
    width: 60,
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
    height: 160,
    width: 390,
    padding: 3,
    borderRadius: 10,
    marginTop: 20,
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
  banner: {
    height: 55,
    width: 340,
  }
});
