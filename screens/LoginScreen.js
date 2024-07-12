import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { BASE_URL } from '@env';
import axios from 'axios';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          navigation.replace('Main');
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const user = {
      phoneNumber: phoneNumber,
      password: password,
    };

    const postUser = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${BASE_URL}login`, user);
        if (res.status === 200) {
          const token = res.data.token;
          AsyncStorage.setItem('authToken', token);
          setLoading(false);
          setPassword('');
          navigation.replace('Main');
        } else {
          setLoading(false);
          Toast.show({ type: 'error', text1: 'Tài khoản hoặc mật khẩu sai' });
        }
      } catch (error) {
        setLoading(false);
        Toast.show({ type: 'error', text1: 'Tài khoản hoặc mật khẩu sai' });
        console.log('Lỗi! (LoginScreen): ', error);
      }
    };
    postUser();
  };

  return (
    <SafeAreaView className='flex-1 items-center bg-white'>
      <StatusBar />
      <View className='my-8 items-center'>
        <Image className='w-32 h-32' source={require('../assets/logoHp.png')} />
      </View>

      <KeyboardAvoidingView className='px-4'>
        <Text className='text-2xl font-bold text-center'>Đăng nhập</Text>

        <View className='flex-row items-center border-b border-gray-300 pb-1 mt-6 w-full'>
          <AntDesign name='mobile1' size={24} color='gray' />
          <TextInput
            className='ml-1 flex-1 text-[18px] py-1.5'
            placeholder='Nhập số điện thoại...'
            value={phoneNumber}
            keyboardType='numeric'
            onChangeText={setPhoneNumber}
          />
        </View>

        <View className='flex-row items-center border-b border-gray-300 pb-1 mt-6 w-full'>
          <AntDesign name='lock1' size={24} color='gray' />
          <TextInput
            autoCapitalize='none'
            className='ml-1 flex-1 text-[18px] py-1.5'
            placeholder='Nhập mật khẩu...'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color='gray'
            onPress={toggleShowPassword}
          />
        </View>

        <View className='mt-2 items-end'>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Thông báo',
                'Mật khẩu mặc định là: 88888888, bạn có thể thay đổi trong phần sửa hồ sơ'
              );
            }}
          >
            <Text className='text-blue-500'>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <View className='mt-6'>
          <TouchableOpacity
            onPress={handleLogin}
            className='bg-primary-pink rounded-xl mx-auto px-4 py-4 w-full'
          >
            {loading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text className='text-white text-center text-[18px] font-semibold'>
                Đăng nhập
              </Text>
            )}
          </TouchableOpacity>

          <View className='mt-2 items-center'>
            <TouchableOpacity
              className='py-2'
              onPress={() => navigation.navigate('Register')}
            >
              <Text className='text-center text-blue-500'>
                Chưa có tài khoản? Đăng ký ngay!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
