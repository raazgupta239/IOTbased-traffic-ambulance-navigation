import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigation/TabNavigator";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import VerifyOtp from "./screens/VerifyOtp";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // State to check OTP verification

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
          <>
            {/* Login Screen */}
            <Stack.Screen 
              name="Login" 
              options={{ headerShown: false }}
            >
              {props => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>

            {/* Sign-Up Screen */}
            <Stack.Screen 
              name="SignUp" 
              options={{ headerShown: true, title: "Sign Up" }}
            >
              {props => (
                <SignUpPage 
                  {...props} 
                  setIsLoggedIn={setIsLoggedIn} 
                  setIsVerified={setIsVerified} // Pass setIsVerified for OTP flow
                />
              )}
            </Stack.Screen>

            {/* Verify OTP Screen */}
            <Stack.Screen 
              name="VerifyOtp" 
              options={{ headerShown: true, title: "Verify OTP" }} // Modify title based on context
            >
              {props => <VerifyOtp {...props} setIsVerified={setIsVerified} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
