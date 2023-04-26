import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList, Image, Dimensions, ScrollView } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Weather from "./Weather";

const splugenLogo = require('./assets/splugen_logo.png');
const tusseyMountainLogo = require('./assets/tussey_mountain_logo.webp');
const davosLogo = require('./assets/davos_logo.png');



var runningStatus = false;

function HomeScreen({ navigation }) {

  const [resortLogo, setResortLogo] = useState(require('./assets/splugen_logo.png'));
  const [timerIntervals, setTimerIntervals] = useState([]);

  const onTimerLogoPress = () => {
    navigation.navigate('TrackingScreen', {
      timerIntervals: timerIntervals,
      setTimerIntervals: setTimerIntervals,
    });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.rectangleBorderHome}>
        <Text style={[styles.topText, { marginTop: 10, textAlign: 'center' }]}>Welcome to SafeSki! {"\n"} The current resort selected is: </Text>
      </View>
      <TouchableOpacity style={styles.rectangleBox}
        onPress={() => {
          navigation.navigate('Resort', { name: 'Resort', updateResortLogo: setResortLogo });
        }}
      >
        <Image source={resortLogo} style={[styles.resortLogoHome, {resizeMode: 'contain'}]} />
      </TouchableOpacity>
      <Text style={[styles.blueText, { height: 50, marginTop: 50 }]}>START TRACKING</Text>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => {
          runningStatus = !runningStatus;
          navigation.navigate('TrackingScreen', { name: 'Track your day', timerIntervals: timerIntervals, setTimerIntervals: setTimerIntervals, });
        }}
>
        <Image source={require('./assets/icon.png')} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomItem}
          onPress={() =>
            navigation.navigate('Resort', { name: 'Resort' })
          }>
        <Image source={require('./assets/resortsLogo.png')} style={styles.logoBottomResort} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomItem}
        >
          <Image source={require('./assets/icon.png')} style={styles.logoBottom} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomItem}
          onPress={onTimerLogoPress}>
        <Image source={require('./assets/timerLogo.png')} style={styles.logoBottomTimer} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ResortScreen({ navigation, route }) {
  const [resorts, setResorts] = useState([
    { resortName: 'Splügen', key: '1', imagePath: splugenLogo, text: 'Splügen' },
    { resortName: 'Tussey Mountain', key: '2', imagePath: tusseyMountainLogo, text: 'Tussey Mountain' },
    { resortName: 'Davos', key: '3', imagePath: davosLogo, text: 'Davos' },
  ]);
  

  const getImagePath = (resortName) => {
    switch (resortName) {
      case 'Splügen':
        return require('./assets/splugen_logo.png');
      case 'Tussey Mountain':
        return require('./assets/tussey_mountain_logo.webp');
      case 'Davos':
        return require('./assets/davos_logo.png');
      default:
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <FlatList
        data={resorts}
        renderItem={({ item }) => (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.rectangleBorderResorts}>
            <Text style={[styles.topText, { textAlign: 'center', justifyContent: 'center' }]}>{item.text}</Text>
          </View>
          <TouchableOpacity
          style={styles.rectangleBoxResorts}
          onPress={() => {
            const logo = getImagePath(item.resortName);
            route.params.updateResortLogo(logo);
            navigation.navigate(item.resortName, { name: item.resortName });
          }}
          >
          <Image source={getImagePath(item.resortName)} style={styles.resortLogoResorts} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        )}
      />

    </View>
  );
}

function TrackingScreen({ navigation, route }) {
  const [time, setTime] = useState(0);
  const params = route ? route.params : navigation.state.params;
  const { timerIntervals, setTimerIntervals } = {
    timerIntervals: [],
    setTimerIntervals: () => {},
    ...params,
  };
  useEffect(() => {
    let timeout = null;
    let startTime = null;

    function tick() {
      setTime(Math.floor((Date.now() - startTime) / 1000));
      timeout = setTimeout(tick, 1000 - ((Date.now() - startTime) % 1000));
    }

    if (runningStatus) {
      startTime = Date.now();
      tick();
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [runningStatus]);

  useEffect(() => {
    if (timerIntervals.length > 0) {
      const lastInterval = timerIntervals[timerIntervals.length - 1];
      setTime(lastInterval);
    }
  }, [timerIntervals]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const onStopButtonPress = () => {
    runningStatus = !runningStatus;
    setTimerIntervals([...timerIntervals, time]);
    setTime(0);
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 175 }}>
      {timerIntervals.map((interval, index) => (
        <Text key={index} style={{ fontSize: 20 }}>{`Interval ${index + 1}: ${formatTime(interval)}`}</Text>
      ))}
      <Text style={{ fontSize: 35 }}>{formatTime(time)}</Text>
      <Text style={[styles.blueText, { height: 50, marginTop: 35 }]}>STOP TRACKING</Text>
      <TouchableOpacity onPress={onStopButtonPress} style={styles.roundButtonTracking}>
        <Image source={require('./assets/icon.png')} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}



function SplugenResortScreen({ navigation }) {

  const [language, setLanguage] = useState("en");
  const [unit, setUnit] = useState("metric");
  const { width, height } = Dimensions.get('window');

  const handleSkiPatrolPress = () => {
    Alert.alert(
      "Ski Patrol",
      "The ski patrol is being called",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      <View style={styles.navBar}>
        <View style={styles.lanMenu}>
          <TouchableOpacity
            onPress={() => setLanguage("en")}
            style={styles.navBarItemContainer}
          >
            <Text style={styles.navBarItem}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLanguage("it")}
            style={styles.navBarItemContainer}
          >
            <Text style={styles.navBarItem}>Italiano</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.unitMenu}>
          <TouchableOpacity
            onPress={() => setUnit("metric")}
            style={styles.navBarItemContainer}
          >
            <Text style={styles.navBarItem}>Metric</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUnit("imperial")}
            style={styles.navBarItemContainer}
          >
            <Text style={styles.navBarItem}>Imperial</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rectangleBorderSplugen}>
        <Text style={[styles.topTextSplugen, { textAlign: 'center', justifyContent: 'center' }]}>Splügen</Text>
      </View>
      <View style={styles.weatherContainer}>
        <Weather lat={46.5528} lon={9.3234} lan={language} un={unit} />
      </View>
      <TouchableOpacity onPress={() => handleSkiPatrolPress()} style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.topText}>Ski patrol number: 081 650 90 10</Text>
        </View>
      </TouchableOpacity>
      <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('FullScreenImage', {
          source: require('./assets/splugen_map.jpg'),
          })
        }
      >
        <Image
          source={require("./assets/splugen_map.jpg")}
          resizeMode="contain"
          style={{ height: height, width: width, marginTop: -250, zIndex: -1 }}
        />
      </TouchableOpacity>
      </View>
    </View>
  );

}

function FullScreenImageScreen({ route }) {
  const { source } = route.params;

  return (
    <View style={styles.fullScreenImageContainer}>
      <Image
        source={source}
        resizeMode="contain"
        style={styles.fullScreenImage}
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
          options={{
            headerTitle: () => (
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
          name="TrackingScreen"
          component={TrackingScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="Splügen"
          component={SplugenResortScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="FullScreenImage"
          component={FullScreenImageScreen}
          options={{ headerShown: false }}
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
  weatherContainer: {
    borderWidth: 3,
    borderColor: 0x73c2f9,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginTop: 50,
  },
  button: {
    backgroundColor: "#73c2fb",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    zIndex: 1,
  },
  roundButton: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 0x73c2c9,
    marginTop: 30,
    borderWidth: 3,
    borderColor: 0x73c2f9,
  },
  roundButtonTracking: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 0x73c2c9,
    marginTop: 40,
    borderWidth: 3,
    borderColor: 0x73c2f9,
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
  blackText:{
    fontFamily: 'Roboto',
    fontSize:35,
    marginBottom: 10,
    color: 'black'
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
  logoBottomResort: {
    width: 80,
    height: 70,
  },
  logoBottomTimer: {
    width: 60,
    height: 65,
  },
  bottomBar: {
    bottom: 0,
    marginBottom: 0,
    position: 'absolute',
    flexDirection: 'row',
  },
  
  bottomItem: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    height: 100,
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
    borderWidth: 3,
    borderColor: 0x73c2f9,
  },
  rectangleBoxResorts: {
    backgroundColor: 0x73c2c9,
    height: 150,
    width: 370,
    padding: 3,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 0x73c2f9,
  },
  
  rectangleBorderHome: {
    borderWidth: 3,
    borderColor: 0x73c2f9,
    height: 90,
    width: 330,
    padding: 3,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  rectangleBorderResorts: {
    borderWidth: 3,
    borderColor: 0x73c2f9,
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  rectangleBorderSplugen: {
    borderWidth: 3,
    borderColor: 0x73c2f9,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    marginTop: 30,
    marginLeft: 115,
  },  
  topTextSplugen: {
    fontSize: 28,
    color: 0x73c2fb,
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
  resortLogoHome: {
    width: 250,
    height: 100,
  },
  resortLogoResorts: {
    marginTop: 10,
    width: 350,
    height: 120,
  },
  banner: {
    height: 55,
    width: 340,
  },
  navBar: {
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'relative',
    top: 0,
    borderBottomWidth: 2,
    borderBottomColor: 0x73c2f9,
  },
  navBarItem: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lanMenu: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  unitMenu: {
    flex: 0.80,
    alignItems: 'center',
    flexDirection: 'row'
  },
  navBarItemContainer: {
    backgroundColor: 0x73c2c9,
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 5,
  },
  fullScreenImageContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 0.9,
    resizeMode: 'contain',
    transform: [{ rotate: '90deg' }],
  },
});
