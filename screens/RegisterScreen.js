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
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import axios from 'axios';

const RegisterScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const validatePhoneNumber = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    if (phone === '' || password === '' || name === '') {
      Alert.alert('Lỗi!', 'Vui lòng nhập đủ thông tin');
      return;
    }
    if (validatePhoneNumber.test(phone) === false) {
      Alert.alert('Lỗi!', 'Số điện thoại không hợp lệ');
      return;
    }

    axios
      .post('http://192.168.2.14:8000/verify', { phone })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const otp = data.otp;
          navigation.navigate('Verify', { name, phone, password, otp });
        } else {
          Alert.alert('Lỗi', 'Đăng ký không thành công!');
        }
      })
      .catch((err) => {
        Alert.alert('Lỗi', 'Đăng ký không thành công!');
        console.log(err);
      });
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

        <View className='mt-24'>
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

        <View className='mt-20'>
          <Pressable
            onPress={handleRegister}
            className='w-[200px] bg-[#302671] rounded-md mx-auto px-4 py-4'
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
