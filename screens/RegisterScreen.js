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
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { BASE_URL } from '@env';
import axios from 'axios';
import validatePhone from '../utils/validatePhone';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('88888888');
  const [confirmPass, setConfirmPass] = useState('88888888');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    if (password != confirmPass) {
      Alert.alert('Lỗi', 'Mật khẩu không giống nhau');
      return;
    }

    if (validatePhone(phoneNumber)) {
      const postPhone = async () => {
        try {
          // const res = await axios.post(`${BASE_URL}/verify`, { phone });
          // const otp = res.data.otp;
          const otp = 888888;
          navigation.navigate('Verify', {
            name: name,
            loginInfo: phoneNumber,
            password: password,
            address: address,
            phoneNumber: phoneNumber,
            otp: otp,
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
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Người dùng từ chối quyền truy cập');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});

      let reverseGeocode = await Location.reverseGeocodeAsync({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });

      if (reverseGeocode[0]?.formattedAddress === undefined) {
        setAddress(
          `${reverseGeocode[0]?.name}, ${reverseGeocode[0]?.street}, ${reverseGeocode[0]?.subregion}, ${reverseGeocode[0]?.region}`
        );
      } else {
        setAddress(`${reverseGeocode[0]?.formattedAddress}`);
      }

      console.log('Đã lấy được địa chỉ:', reverseGeocode);
    };
    getPermissions();
  }, []);

  return (
    <SafeAreaView className='flex-1 items-center bg-white'>
      <StatusBar />
      <View className='my-8 flex-row items-center' style={{ gap: 20 }}>
        <Image className='w-24 h-24' source={require('../assets/logoHp.png')} />
        <Text className='text-2xl font-bold'>Đăng ký</Text>
      </View>

      <KeyboardAvoidingView>
        <View className='flex-row items-center gap-1 border-b border-gray-300 py-1 px-1'>
          <AntDesign name='mobile1' size={24} color='gray' />
          <TextInput
            className='w-[300px] text-[18px] py-1.5'
            placeholder='Nhập số điện thoại...'
            value={phoneNumber}
            keyboardType='numeric'
            onChangeText={setPhoneNumber}
          />
        </View>

        <View className='mt-5'>
          <View className='flex-row items-center gap-1 border-b border-gray-300 py-1 px-1'>
            <AntDesign name='user' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-[18px] py-1.5'
              placeholder='Nhập tên của bạn...'
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View className='mt-5'>
          <View className='flex-row items-center gap-1 border-b border-gray-300 py-1 px-1'>
            <Ionicons name='location-outline' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-[18px] py-1.5'
              placeholder='Nhập địa chỉ bạn...'
              multiline
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>

        <View className='mt-5'>
          <View className='flex-row items-center gap-1 border-b border-gray-300 py-1 px-1'>
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
        </View>

        <View className='mt-5'>
          <View className='flex-row items-center gap-1 border-b border-gray-300 py-1 px-1'>
            <AntDesign name='lock1' size={24} color='gray' />
            <TextInput
              autoCapitalize='none'
              className='w-[300px] text-[18px] py-1.5'
              placeholder='Nhập lại mật khẩu...'
              value={confirmPass}
              onChangeText={setConfirmPass}
              secureTextEntry={!showPassword}
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
          <Text className='text-gray-500'>
            (Đã điền sẵn mật khẩu mặc định là: 88888888)
          </Text>
        </View>

        <View className='mt-10'>
          <Pressable
            onPress={handleRegister}
            className='w-full bg-primary-pink rounded-md mx-auto px-4 py-4'
          >
            <Text className='text-white text-center text-lg font-semibold'>
              Đăng ký
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()} className='py-2 mt-2'>
            <Text className='text-center text-blue-500'>
              Đã có tài khoản? Đăng nhập ngay!
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
