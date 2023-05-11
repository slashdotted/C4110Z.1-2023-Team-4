import { StyleSheet } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps'

const Map = () => {
 
    const origin = {latitude: 46.53091023813659, longitude: 9.314519915397712, description: "Origin"}

    return (
        <MapView
            style={{
                flex: 1,
                width: "100%",
                height: "100%"
            }}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            {origin?.latitude && origin?.longitude && (
                <Marker
                    coordinate={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}
        </MapView>
    );
}

export default Map

const styles = StyleSheet.create({})