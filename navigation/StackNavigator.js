import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import RegisterScreen from '../screens/RegisterScreen';
import VerifySceen from '../screens/VerifyScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const primaryBlue = '#302671';

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Trang chủ',
            headerShown: false,
            tabBarLabelStyle: { color: primaryBlue },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='home' size={24} color={primaryBlue} />
              ) : (
                <Ionicons name='home-outline' size={24} color={primaryBlue} />
              ),
          }}
        />

        <Tab.Screen
          name='Notification'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Thông báo',
            headerShown: false,
            tabBarLabelStyle: { color: primaryBlue },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='notifications' size={24} color={primaryBlue} />
              ) : (
                <Ionicons
                  name='notifications-outline'
                  size={24}
                  color={primaryBlue}
                />
              ),
          }}
        />

        <Tab.Screen
          name='Cart'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Giỏ hàng',
            headerShown: false,
            tabBarLabelStyle: { color: primaryBlue },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='cart' size={24} color={primaryBlue} />
              ) : (
                <Ionicons name='cart-outline' size={24} color={primaryBlue} />
              ),
          }}
        />

        <Tab.Screen
          name='Profile'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Tài khoản',
            headerShown: false,
            tabBarLabelStyle: { color: primaryBlue },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='person' size={24} color={primaryBlue} />
              ) : (
                <Ionicons name='person-outline' size={24} color={primaryBlue} />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Verify'
          component={VerifySceen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Main'
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
