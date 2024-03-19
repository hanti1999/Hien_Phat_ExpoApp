import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifySceen from '../screens/VerifyScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Trang chủ',
            headerShown: false,
            tabBarLabelStyle: { color: '#302671' },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name='home' size={24} color='#302671' />
              ) : (
                <AntDesign name='home' size={24} color='black' />
              ),
          }}
        />

        <Tab.Screen
          name='Profile'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Tài khoản',
            headerShown: false,
            tabBarLabelStyle: { color: '#302671' },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='person' size={24} color='#302671' />
              ) : (
                <Ionicons name='person-outline' size={24} color='black' />
              ),
          }}
        />

        <Tab.Screen
          name='Cart'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Giỏ hàng',
            headerShown: false,
            tabBarLabelStyle: { color: '#302671' },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='cart' size={24} color='#302671' />
              ) : (
                <Ionicons name='cart-outline' size={24} color='black' />
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
