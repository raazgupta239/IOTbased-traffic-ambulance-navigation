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
     <View style={styles.navbar}>
        {
          <>
            {/* Profile Image */}
            <Image 
              source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }} // Replace with your profile image URL
              style={styles.profileImage}
            />
            {/* <Text style={styles.navbarText}>Hi {user.name}</Text> */}
            <Text style={styles.hi}>Hi</Text><Text style={styles.navbarText}>{user.name}</Text>
          </>
        }
      </View>

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
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',  // White background for navbar
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop:35,
  },
  navbarText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginLeft:0,
    padding:5,
  },
  hi: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft:5,
    padding:5,
  },
  profileImage: {
    width: 40,  // Set the size of the profile image
    height: 40,
    borderRadius: 20, // To make it circular
    marginLeft:15,
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
