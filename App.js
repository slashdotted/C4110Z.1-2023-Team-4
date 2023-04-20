import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert , FlatList} from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var runningStatus = false;

function HomeScreen({ navigation }) {
  if(runningStatus){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() =>{
            runningStatus = !runningStatus;
            if(runningStatus){
              log('Accident Detection has started');
            }
            else{
              log('Accident Detection has stopped');
            }
            navigation.navigate('Resort', { name: 'Resort' })
          }
          }>
          
          <Text style={styles.whiteText}>START</Text>
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
            <Text style={styles.miniRoundButton}></Text>
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
  else{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() =>{
          runningStatus = !runningStatus;
          navigation.navigate('Resort', { name: 'Resort' })
        }
        }>
        <Text style={styles.whiteText}>START</Text>
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
          <Text style={styles.miniRoundButton}></Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    alignContent: 'center',
  },
  roundButton: {
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
    alignContent: 'center',
    height: '10%',
    width: '100%',
    color: 'black',
    fontSize: 18,
    marginTop: 0
  },
  miniRoundButton: {
    width:50,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    borderWidth: 3,
    backgroundColor: 'black',
    borderColor: 'red',
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
    height:75,
  },
  bottomText: {
    fontSize:24,
  },
});
