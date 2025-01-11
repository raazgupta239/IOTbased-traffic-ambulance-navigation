import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userContext'; // Import the useUser hook

const Dashboard = () => {
  const [ambulanceLocation, setAmbulanceLocation] = useState({
    latitude: 27.7172,
    longitude: 85.3240,
  });

  const { user } = useUser(); // Access user from the context
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulanceLocation((prevLocation) => ({
        latitude: prevLocation.latitude + 0.0001,
        longitude: prevLocation.longitude + 0.0001,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

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
        <Marker coordinate={ambulanceLocation} title="Ambulance" description="Simulated tracking of the ambulance">
          <Image source={require('../assets/ambulance.png')} style={styles.markerImage} />
        </Marker>
      </MapView>

      <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
        <Image source={require('../assets/favicon.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      
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
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  buttonImage: {
    width: 40,
    height: 40,
  },
});

export default Dashboard;
