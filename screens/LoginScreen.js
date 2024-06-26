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
  const [loginInfo, setLoginInfo] = useState('');
  const [password, setPassword] = useState('');
  const [phoneLogin, setPhoneLogin] = useState(true);
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
      loginInfo: loginInfo,
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
        <View className='items-center'>
          <Text className='text-2xl font-bold'>Đăng nhập</Text>
        </View>

        <View className='flex-row justify-between items-center mt-24 mb-4'>
          <Pressable>
            <Text className='text-lg font-semibold'>
              {phoneLogin ? 'Điện thoại' : 'Email'}
            </Text>
          </Pressable>
          <Pressable onPress={() => setPhoneLogin(!phoneLogin)}>
            <Text className='text-base text-gray-500'>
              {phoneLogin ? 'Đăng nhập với email' : 'Đăng nhập với điện thoại'}
            </Text>
          </Pressable>
        </View>

        <View className='flex-row items-center gap-1 bg-gray-100 border border-gray-300 py-1 px-1 rounded-md'>
          {phoneLogin ? (
            <>
              <AntDesign name='mobile1' size={24} color='gray' />
              <TextInput
                autoCapitalize='none'
                className='w-[300px] text-[18px] py-1.5'
                placeholder='Nhập số điện thoại...'
                value={loginInfo}
                keyboardType='numeric'
                onChangeText={setLoginInfo}
              />
            </>
          ) : (
            <>
              <AntDesign name='mail' size={24} color='gray' />
              <TextInput
                autoCapitalize='none'
                className='w-[300px] text-[18px] py-1.5'
                placeholder='Nhập Email...'
                value={loginInfo}
                onChangeText={setLoginInfo}
              />
            </>
          )}
        </View>

        <View className='mt-10'>
          <View className='flex-row items-center gap-1 bg-gray-100 border border-gray-300 py-1 px-1 rounded-md'>
            <AntDesign name='lock1' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-[18px] py-1.5'
              placeholder='Nhập mật khẩu...'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onSubmitEditing={handleLogin}
            />
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color='gray'
              onPress={toggleShowPassword}
            />
          </View>
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
            <Text className='text-blue-500 font-medium text-right'>
              Quên mật khẩu?
            </Text>
          </Pressable>
        </View>

        <View className='mt-20'>
          <Pressable
            onPress={handleLogin}
            className='bg-primary-pink rounded-md mx-auto px-4 py-4 w-[200px]'
          >
            {loading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text className='text-white text-center text-[18px] font-bold'>
                Đăng nhập
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Register')}
            className='mt-4'
          >
            <Text className='text-center text-gray-500'>
              Chưa có tài khoản? Đăng ký ngay!
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
