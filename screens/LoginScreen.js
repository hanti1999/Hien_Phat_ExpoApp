import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
        const res = await axios.post(`${BASE_URL}/login`, user);
        if (res.status === 200) {
          const token = res.data.token;
          AsyncStorage.setItem('authToken', token);
          setLoading(false);
          setPassword('');
          navigation.replace('Main');
          console.log('Đăng nhập thành công');
        } else {
          setLoading(false);
          console.log('Đăng nhập không thành công');
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('Lỗi!', 'Tài khoản hoặc mật khẩu sai!');
        console.log('Lỗi! (LoginScreen): ', error);
      }
    };
    postUser();
  };

  return (
    <SafeAreaView className='flex-1 items-center bg-white'>
      <StatusBar />
      <View className='my-8'>
        <Image className='w-32 h-32' source={require('../assets/logoHp.png')} />
      </View>

      <KeyboardAvoidingView>
        <Text className='text-2xl font-bold text-center'>Đăng nhập</Text>

        <View className='flex-row items-center gap-1 border-b border-gray-300 p-1 mt-6'>
          <AntDesign name='mobile1' size={24} color='gray' />
          <TextInput
            className='w-[300px] text-[18px] py-1.5'
            placeholder='Nhập số điện thoại...'
            value={phoneNumber}
            keyboardType='numeric'
            onChangeText={setPhoneNumber}
          />
        </View>

        <View className='flex-row items-center gap-1 border-b border-gray-300 p-1 mt-6'>
          <AntDesign name='lock1' size={24} color='gray' />
          <TextInput
            autoCapitalize='none'
            className='w-[300px] text-[18px] py-1.5'
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

        <View className='mt-2'>
          <Pressable
            onPress={() => {
              Alert.alert(
                'Thông báo',
                'Mật khẩu mặc định là: 88888888, bạn có thể thay đổi trong phần sửa hồ sơ'
              );
            }}
          >
            <Text className='text-blue-500 text-right'>Quên mật khẩu?</Text>
          </Pressable>
        </View>

        <View className='mt-6'>
          <Pressable
            onPress={handleLogin}
            className='bg-primary-pink rounded-md mx-auto px-4 py-4 w-full'
          >
            {loading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text className='text-white text-center text-[18px] font-semibold'>
                Đăng nhập
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Register')}
            className='py-2 mt-2'
          >
            <Text className='text-center text-blue-500'>
              Chưa có tài khoản? Đăng ký ngay!
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
