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
} from 'react-native';
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';
import React, { useState } from 'react';
import axios from 'axios';
import validateEmail from '../utils/validateEmail';
import validatePhone from '../utils/validatePhone';
import { BASE_URL } from '../config';

const RegisterScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('88888888');
  const [confirmPass, setConfirmPass] = useState('88888888');
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
            console.log(otp);
            navigation.navigate('Verify', {
              name: name,
              loginInfo: phone,
              password: password,
              address: address,
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
              address: address,
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
      <StatusBar />
      <View className='mt-8 mb-4 flex-row items-center' style={{ gap: 20 }}>
        <Image className='w-24 h-24' source={require('../assets/logoHp.png')} />
        <Text className='text-2xl font-bold'>Đăng ký</Text>
      </View>

      <KeyboardAvoidingView>
        <View className='items-center'></View>

        <View className='flex-row justify-between mt-4 mb-2'>
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

        <View className='mt-5'>
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

        <View className='mt-5'>
          <View className='flex-row items-center gap-1 bg-gray-200 py-1 px-1 rounded-md'>
            <Ionicons name='location-outline' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-[18px] py-1'
              placeholder='Nhập địa chỉ bạn...'
              numberOfLines={3}
              multiline
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>

        <View className='mt-5'>
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

        <View className='mt-5'>
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

        <View className='mt-2'>
          <Text className='text-gray-500'>
            (Đã điền sẵn mật khẩu mặc định là: 88888888)
          </Text>
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
