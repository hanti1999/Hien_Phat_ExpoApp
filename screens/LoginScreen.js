import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoginScreen = () => {
  const [loginInfo, setLoginInfo] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneLogin, setPhoneLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
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
    if (phoneLogin) {
      const user = {
        loginInfo: phone,
        password: password,
      };

      const postUser = async () => {
        try {
          const res = await axios.post('http://192.168.2.14:8000/login', user);
          const data = res.data;
          const token = res.data.token;
          AsyncStorage.setItem('authToken', token);
          navigation.replace('Main');
        } catch (error) {
          Alert.alert('Lỗi!', 'Tài khoản hoặc mật khẩu sai!');
          console.log(error);
        }
      };
      postUser();
    } else {
      if (validateEmail(email)) {
        const user = {
          loginInfo: email,
          password: password,
        };

        const postUser = async () => {
          try {
            const res = await axios.post(
              'http://192.168.2.14:8000/login',
              user
            );
            const data = res.data;
            const token = res.data.token;
            AsyncStorage.setItem('authToken', token);
            navigation.replace('Main');
          } catch (error) {
            Alert.alert('Lỗi!', 'Tài khoản hoặc mật khẩu sai!');
            console.log(error);
          }
        };
        postUser();
      } else {
        Alert.alert('Lỗi!', 'Email không hợp lệ!');
      }
    }
  };

  return (
    <SafeAreaView className='flex-1 items-center bg-white'>
      <View className='my-8'>
        <Image
          className='w-20 h-20'
          source={require('../assets/favicon.png')}
        />
      </View>

      <KeyboardAvoidingView>
        <View className='items-center'>
          <Text className='text-2xl font-bold'>Đăng nhập</Text>
        </View>

        {phoneLogin ? (
          <>
            <View className='flex-row justify-between mt-24 mb-4'>
              <Pressable>
                <Text className='text-lg font-semibold'>Điện thoại</Text>
              </Pressable>
              <Pressable onPress={() => setPhoneLogin(!phoneLogin)}>
                <Text className='text-base text-gray-500'>
                  Đăng nhập với email
                </Text>
              </Pressable>
            </View>

            <View>
              <View className='flex-row items-center gap-1 bg-gray-200 py-1 px-1 rounded-md'>
                <AntDesign name='mobile1' size={24} color='gray' />
                <TextInput
                  className='w-[300px] text-[18px] py-1'
                  placeholder='Nhập số điện thoại...'
                  value={phone}
                  keyboardType='numeric'
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View className='flex-row justify-between mt-24 mb-4'>
              <Pressable>
                <Text className='text-lg font-semibold'>Email</Text>
              </Pressable>
              <Pressable onPress={() => setPhoneLogin(!phoneLogin)}>
                <Text className='text-base text-gray-500'>
                  Đăng nhập với điện thoại
                </Text>
              </Pressable>
            </View>

            <View>
              <View className='flex-row items-center gap-1 bg-gray-200 py-1 px-1 rounded-md'>
                <AntDesign name='mail' size={24} color='gray' />
                <TextInput
                  className='w-[300px] text-[18px] py-1'
                  placeholder='Nhập Email...'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            </View>
          </>
        )}

        <View className='mt-10'>
          <View className='flex-row items-center gap-1 bg-gray-200 py-1 px-1 rounded-md'>
            <AntDesign name='lock1' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-[18px] py-1'
              placeholder='Nhập mật khẩu...'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color='gray'
              className='pr-2'
              onPress={toggleShowPassword}
            />
          </View>
        </View>

        <View className='mt-2'>
          <Pressable>
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
            <Text className='text-white text-center text-lg font-bold'>
              Đăng nhập
            </Text>
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

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export default LoginScreen;
