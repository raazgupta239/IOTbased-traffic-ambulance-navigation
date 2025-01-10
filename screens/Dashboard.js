import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [ambulanceLocation, setAmbulanceLocation] = useState({
    latitude: 27.7172, // Initial latitude
    longitude: 85.3240, // Initial longitude
  });

  useEffect(() => {
    // Simulate location updates
    const interval = setInterval(() => {
      setAmbulanceLocation((prevLocation) => ({
        latitude: prevLocation.latitude + 0.0001, // Simulate slight movement in latitude
        longitude: prevLocation.longitude+ 0.0001, // Simulate slight movement in longitude
      }));
    }, 1000); // Update every 1 second

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: ambulanceLocation.latitude,
          longitude: ambulanceLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {/* Marker for Ambulance with Custom Icon */}
        <Marker coordinate={ambulanceLocation} title="Ambulance" description="Simulated tracking of the ambulance">
          <Image
            source={require('../assets/ambulance.png')} // Path to the custom image
            style={styles.markerImage}
          />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 50, // Set the width to 50 pixels
    height: 50, // Set the height to 50 pixels
    resizeMode: 'contain', // Ensure the image scales correctly
  },
});

export default MapScreen;
