import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import App from "./App";

const Weather = ({ lat, lon, lan, un }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6e7a4fc969fd023249bddde17f0109bf&units=${un}&lang=${lan}`
      );
      const json = await result.json();
      setWeatherData(json);
    };
    fetchData();
  }, [lat, lon, lan, un]);

  if (!weatherData) return <Text>Loading...</Text>;

  //return <View><Text>{JSON.stringify(weatherData)}</Text></View>
  /*return (
    <View>
      <Text style={{ fontSize: 30 }}>
        Current Weather in {location}
      </Text>
      <Text style={{ fontSize: 20 }}>
        Temperature: {weatherData.main.temp}°C
      </Text>
      <Text style={{ fontSize: 20 }}>
        Description: {weatherData.weather[0].description}
      </Text>
      <Text style={{ fontSize: 20 }}>
        Wind Speed: {weatherData.wind.speed} m/s
      </Text>
    </View>
  );*/

  return (
    <View>
      {weatherData && (
        <>
          <Text style={styles.topText}>{lan == "en" ? "Location" : "Luogo"}: {weatherData.name}</Text>
          <Text style={styles.topText}>{lan == "en" ? "Temperature" : "Temperatura"}: {weatherData.main.temp}{un == "metric"? "°C": "°F"}</Text>
          <Text style={styles.topText}>{lan == "en" ? "Weather" : "Meteo sul luogo"}: {weatherData.weather[0].description}</Text>
          
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    fontSize: 20,
    color: 0x73c2fb,
  },
});

export default Weather;
