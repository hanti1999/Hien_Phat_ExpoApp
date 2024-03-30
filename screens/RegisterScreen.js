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
import React, { useState } from 'react';
import axios from 'axios';
import validateEmail from '../utils/validateEmail';
import validatePhone from '../utils/validatePhone';
import { BASE_URL } from '../config';

const RegisterScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phoneRegister, setPhoneRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    if (password != confirmPass) {
      Alert.alert('Lỗi', 'Mật khẩu không giống nhau');
      return;
    }

    if (phoneRegister) {
      if (validatePhone(phone)) {
        const postPhone = async () => {
          try {
            const res = await axios.post(`${BASE_URL}/verify`, { phone });
            const otp = res.data.otp;
            navigation.navigate('Verify', {
              name,
              loginInfo: phone,
              password,
              otp,
            });
          } catch (error) {
            Alert.alert('Lỗi', 'Đăng ký không thành công!');
            console.log(error);
          }
        };
        postPhone();
      } else {
        Alert.alert('Lỗi!', 'Số điện thoại không hợp lệ!');
      }
    } else {
      if (validateEmail(email)) {
        const postEmail = async () => {
          try {
            const res = await axios.post(`${BASE_URL}/verify-email`, { email });
            const otp = res.data.otp;
            console.log(otp);
            navigation.navigate('Verify', {
              name: name,
              loginInfo: email,
              password: password,
              otp: otp,
            });
          } catch (error) {
            Alert.alert('Lỗi', 'Đăng ký không thành công!');
            console.log(error);
          }
        };
        postEmail();
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
          <Text className='text-2xl font-bold'>Đăng ký</Text>
        </View>

        <View className='flex-row justify-between mt-10 mb-4'>
          <Pressable>
            <Text className='text-lg font-semibold'>
              {phoneRegister ? 'Điện thoại' : 'Email'}
            </Text>
          </Pressable>
          <Pressable onPress={() => setPhoneRegister(!phoneRegister)}>
            <Text className='text-base text-gray-500'>
              {phoneRegister ? 'Đăng ký với email' : 'Đăng ký với điện thoại'}
            </Text>
          </Pressable>
        </View>

        <View className='flex-row items-center gap-1 bg-gray-200 py-1 px-1 rounded-md'>
          {phoneRegister ? (
            <>
              <AntDesign name='mobile1' size={24} color='gray' />
              <TextInput
                className='w-[300px] text-[18px] py-1'
                placeholder='Nhập số điện thoại...'
                value={phone}
                keyboardType='numeric'
                onChangeText={(text) => setPhone(text)}
              />
            </>
          ) : (
            <>
              <AntDesign name='mail' size={24} color='gray' />
              <TextInput
                className='w-[300px] text-[18px] py-1'
                placeholder='Nhập Email...'
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </>
          )}
        </View>

        <View className='mt-10'>
          <View className='flex-row items-center gap-1 bg-gray-200 py-1 px-1 rounded-md'>
            <AntDesign name='user' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-[18px] py-1'
              placeholder='Nhập tên của bạn...'
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>

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
              onPress={toggleShowPassword}
            />
          </View>
        </View>

        <View className='mt-10'>
          <View className='flex-row items-center gap-1 bg-gray-200 py-1 px-1 rounded-md'>
            <AntDesign name='lock1' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-[18px] py-1'
              placeholder='Nhập lại mật khẩu...'
              value={confirmPass}
              onChangeText={(text) => setConfirmPass(text)}
              secureTextEntry={!showPassword}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color='gray'
              onPress={toggleShowPassword}
            />
          </View>
        </View>

        <View className='mt-10'>
          <Pressable
            onPress={handleRegister}
            className='w-[200px] bg-primary-pink rounded-md mx-auto px-4 py-4'
          >
            <Text className='text-white text-center text-lg font-bold'>
              Đăng ký
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()} className='mt-4'>
            <Text className='text-center text-gray-500'>
              Đã tài khoản? Đăng nhập ngay!
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
