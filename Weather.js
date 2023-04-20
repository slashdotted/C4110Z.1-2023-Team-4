import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const Weather = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6e7a4fc969fd023249bddde17f0109bf
        &units=metric`
      );
      setWeatherData(result.data);
    };
    fetchData();
  }, [lat, lon]);

  if (!weatherData) return <Text>Loading...</Text>;

  return (
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
  );
};

export default Weather;
