import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL, P_PINK } from '../config';
import { UserType } from '../userContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [currentUser, setCurrentUser] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodeToken = jwtDecode(token);
      const uId = decodeToken.userId;
      setUserId(uId);
    };

    fetchUser();
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/${userId}`);
        const user = res.data.user;
        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/${userId}`);
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth token cleared');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
