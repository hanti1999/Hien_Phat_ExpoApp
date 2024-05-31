import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  FontAwesome,
  AntDesign,
  Ionicons,
  Foundation,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import { BASE_URL, P_PINK } from '../config';
import { UserType } from '../userContext';
import { clearCart } from '../redux/slices/CartReducer';

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [currentUser, setCurrentUser] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        setLoading(false);
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
        const orders = response.data?.orders;
        setOrders(orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    dispatch(clearCart());
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth token cleared');
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ gap: 10 }}
        className='bg-white py-2 flex-row justify-center items-center'
      >
        <Text>Đang tải</Text>
        <ActivityIndicator color={'#fff'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <ScreenHeader text={'Tài khoản'} />
        <View
          style={{ gap: 12 }}
          className='p-2 flex-row items-center bg-white'
        >
          <View className='bg-primary-pink flex justify-center items-center w-20 h-20 rounded-full'>
            <FontAwesome name='user-o' size={40} color='white' />
          </View>
          <View>
            <Text className='text-xl font-semibold'>{currentUser?.name}</Text>
            <Text className='text-gray-500'>{currentUser?.loginInfo}</Text>
          </View>
        </View>

        <View className='p-2 mt-2 bg-white'>
          <Pressable
            onPress={() => Alert.alert('Thông báo', 'Đang phát triển')}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <AntDesign name='user' size={24} color='black' />
              <Text className='text-base'>Thông tin cá nhân</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('Thông báo', 'Đang phát triển')}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <FontAwesome name='list-alt' size={24} color='black' />
              <Text className='text-base'>Đơn hàng của bạn</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>
        </View>

        <View className='p-2 mt-2 bg-white'>
          <Pressable
            onPress={() => Alert.alert('Thông báo', 'Đang phát triển')}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <FontAwesome name='building-o' size={24} color='black' />
              <Text className='text-base'>Thông tin công ty</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('Thông báo', 'Đang phát triển')}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <FontAwesome name='file-text-o' size={24} color='black' />
              <Text className='text-base'>Điều khoản và chính sách</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>

          <OpenURLButton url='https://maps.app.goo.gl/kpnCoJAakPAB4ZJE7'>
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <Foundation name='map' size={24} color='black' />
              <Text className='text-base'>Tìm cửa hàng</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </OpenURLButton>
        </View>

        <View className='p-2 bg-white mt-2'>
          <Pressable onPress={() => handleLogout()}>
            <View
              className='flex-row items-center justify-center py-3'
              style={{ gap: 10 }}
            >
              <Ionicons name='log-out-outline' size={26} color='red' />
              <Text className='text-red-500 font-semibold text-lg'>
                Đăng xuất
              </Text>
            </View>
          </Pressable>
        </View>

        <View className='px-2 py-4'>
          <Text className='text-center text-gray-500'>
            Gas Hiền Phát - v{'1.0.0'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const OpenURLButton = ({ url, children }) => {
  const handlePress = async () => {
    const canOpenURL = await Linking.canOpenURL(url);

    if (canOpenURL) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Không thể mở URL: ${url}`);
    }
  };
  return (
    <Pressable
      onPress={() => handlePress()}
      className='flex-row items-center justify-between py-3'
    >
      {children}
    </Pressable>
  );
};

export default ProfileScreen;
