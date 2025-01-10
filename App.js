import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigation/TabNavigator";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // Main application screen after login
          <Stack.Screen 
            name="Main" 
            component={TabNavigator} 
            options={{ headerShown: false }} 
          />
        ) : (
          // Login and SignUp screens
          <>
            {/* Login Screen */}
            <Stack.Screen 
              name="Login" 
              options={{ headerShown: false }}
            >
              {({navigation}) => <LoginPage navigation={navigation} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>

            {/* Sign-Up Screen */}
            <Stack.Screen 
              name="SignUp" 
              options={{ headerShown: true, title: "Sign Up" }}
            >
              {({navigation}) => <SignUpPage navigation={navigation} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
