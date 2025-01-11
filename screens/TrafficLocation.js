import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

export default function TrafficLocation() {
  const [ambulanceDirection, setAmbulanceDirection] = useState(""); // Direction of ambulance
  const [lights, setLights] = useState({
    north: "red",
    south: "red",
    east: "red",
    west: "red",
  });

  useEffect(() => {
    // Simulate ambulance detection
    const simulateAmbulance = () => {
      const directions = ["north", "south", "east", "west"];
      const direction = directions[Math.floor(Math.random() * directions.length)];
      setAmbulanceDirection(direction);
      Alert.alert("Notification", `Ambulance detected from ${direction.toUpperCase()}`);
      handleTrafficLights(direction);
    };

    const interval = setInterval(simulateAmbulance, 5000); // Simulate every 5 seconds
    return () => clearInterval(interval);
  }, []); 

  const handleTrafficLights = (direction) => {
    // Turn all lights red, then make the ambulance's direction green
    setLights({
      north: "red",
      south: "red",
      east: "red",
      west: "red",
      [direction]: "green",
    });
  };

  return (
    <View style={styles.container}>
      {/* Compass */}
      <View style={styles.compassContainer}>
        <Text style={styles.compassText}>
          Ambulance Coming from: {ambulanceDirection.toUpperCase() || "N/A"}
        </Text>
      </View>

      {/* Roads */}
      <View style={styles.roadContainer}>
        <View style={styles.roadRow}>
          <TrafficLight color={lights.north} />
        </View>

        <View style={styles.roadRow}>
          <TrafficLight color={lights.west} />
          <View style={styles.compass}>
            <Text style={styles.compassTitle}>🚔 Compass</Text>
          </View>
          <TrafficLight color={lights.east} />
        </View>

        <View style={styles.roadRow}>
          <TrafficLight color={lights.south} />
        </View>
      </View>
    </View>
  );
}

// TrafficLight Component
const TrafficLight = ({ color }) => {
  return (
    <View style={styles.trafficLight}>
      <View style={[styles.light, { backgroundColor: color === "red" ? "red" : "gray" }]} />
      <View style={[styles.light, { backgroundColor: color === "yellow" ? "yellow" : "gray" }]} />
      <View style={[styles.light, { backgroundColor: color === "green" ? "green" : "gray" }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  compassContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  compassText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roadContainer: {
    width: "80%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  roadRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  compass: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    margin: 10,
  },
  compassTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  trafficLight: {
    width: 30,
    height: 80,
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 2,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
  },
  light: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
