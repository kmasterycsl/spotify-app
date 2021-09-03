import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArtistDetailScreen from "../screens/ArtistDetailScreen";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types/routes.types";
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="ArtistDetail"
        component={ArtistDetailScreen}
        options={{
          headerTitle: () => null,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
