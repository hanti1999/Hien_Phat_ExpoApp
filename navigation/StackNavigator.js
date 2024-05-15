import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NotificationScreen from '../screens/NotificationScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VerifySceen from '../screens/VerifyScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const primaryPink = '#fb77c5';

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Trang chủ',
            headerShown: false,
            tabBarActiveTintColor: primaryPink,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='home' size={24} color={primaryPink} />
              ) : (
                <Ionicons name='home-outline' size={24} color={'#333'} />
              ),
          }}
        />

        <Tab.Screen
          name='Notification'
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Thông báo',
            headerShown: false,
            tabBarActiveTintColor: primaryPink,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='notifications' size={24} color={primaryPink} />
              ) : (
                <Ionicons
                  name='notifications-outline'
                  size={24}
                  color={'#333'}
                />
              ),
          }}
        />

        <Tab.Screen
          name='Cart'
          component={CartScreen}
          options={{
            tabBarLabel: 'Giỏ hàng',
            headerShown: false,
            tabBarActiveTintColor: primaryPink,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='cart' size={24} color={primaryPink} />
              ) : (
                <Ionicons name='cart-outline' size={24} color={'#333'} />
              ),
          }}
        />

        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Tài khoản',
            headerShown: false,
            tabBarActiveTintColor: primaryPink,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='person' size={24} color={primaryPink} />
              ) : (
                <Ionicons name='person-outline' size={24} color={'#333'} />
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
        <Stack.Screen
          name='Info'
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Order'
          component={OrderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
