import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Profile = () => {
  const route = useRoute();
  const { user } = route.params; // Extract user details
console.log(user);
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Phone: {user.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#ccc",
  },
  detailsContainer: {
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
    padding: 20,
  },
  detail: {
    fontSize: 16,
    color: "#ccc",
  },
});

export default Profile;
