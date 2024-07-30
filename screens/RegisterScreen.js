import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import { ACCESS_TOKEN } from '@env';
import axios from 'axios';
import validatePhone from '../utils/validatePhone';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('88888888');
  const [confirmPass, setConfirmPass] = useState('88888888');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (password != confirmPass) {
      Toast.show({ type: 'error', text1: 'Mật khẩu không giống nhau' });
      return;
    }

    if (validatePhone(phoneNumber) === false) {
      Toast.show({ type: 'error', text1: 'Số điện thoại không hợp lệ' });
      return;
    }

    if (address === '') {
      Toast.show({ type: 'error', text1: 'Vui lòng nhập địa chỉ' });
      return;
    }

    try {
      setLoading(true);
      const otp = generateOTP();
      const formatedPhone = phoneNumber.replace('0', '84');
      const zaloApi = 'https://business.openapi.zalo.me/message/template';
      const data = {
        phone: formatedPhone,
        template_id: '353435',
        template_data: { opt: otp },
      };
      const config = {
        headers: { access_token: ACCESS_TOKEN },
      };
      const res = await axios.post(zaloApi, data, config);

      if (res.data.error === 0) {
        console.log('Gửi OTP thành công');
        setLoading(false);

        navigation.navigate('Verify', {
          name: name,
          password: password,
          address: address,
          phoneNumber: phoneNumber,
          otp: otp,
        });
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: `${res.data.message} (${res.data.error})`,
        });
        console.log(`${res.data.message} (${res.data.error})`);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({ type: 'error', text1: 'Đăng ký không thành công' });
      console.log(error);
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

      console.log('Đã lấy được địa chỉ');
      Toast.show({ text1: 'Đã tự điền địa chỉ' });
      // console.log(reverseGeocode);
    };
    getPermissions();
  }, []);

  return (
    <SafeAreaView className='flex-1 items-center bg-white'>
      <View className='my-8 flex-row items-center' style={{ gap: 20 }}>
        <Image className='w-24 h-24' source={require('../assets/logoHp.png')} />
        <Text className='text-2xl font-bold'>Đăng ký</Text>
      </View>

      <KeyboardAvoidingView className='px-4'>
        <View className='flex-row items-center border-b border-gray-300 pb-1 w-full'>
          <AntDesign name='mobile1' size={24} color='gray' />
          <TextInput
            className='ml-1 flex-1 text-[18px] py-1.5'
            placeholder='Nhập số điện thoại...'
            value={phoneNumber}
            keyboardType='numeric'
            onChangeText={setPhoneNumber}
          />
        </View>

        <View className='flex-row items-center border-b border-gray-300 pb-1 w-full mt-5'>
          <AntDesign name='user' size={24} color='gray' />
          <TextInput
            className='ml-1 flex-1 text-[18px] py-1.5'
            placeholder='Nhập tên của bạn...'
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className='flex-row items-center border-b border-gray-300 pb-1 w-full mt-5'>
          <Ionicons name='location-outline' size={24} color='gray' />
          <TextInput
            className='ml-1 flex-1 text-[18px] py-1.5'
            placeholder='Nhập địa chỉ bạn...'
            multiline
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View className='flex-row items-center border-b border-gray-300 pb-1 w-full mt-5'>
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

        <View className='flex-row items-center border-b border-gray-300 pb-1 w-full mt-5'>
          <AntDesign name='lock1' size={24} color='gray' />
          <TextInput
            autoCapitalize='none'
            className='ml-1 flex-1 text-[18px] py-1.5'
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

        <View className='mt-2'>
          <Text className='text-gray-500'>
            (Đã điền sẵn mật khẩu mặc định là: 88888888)
          </Text>
        </View>

        <View className='mt-10'>
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            className='w-full bg-primary-pink rounded-xl mx-auto px-4 py-4'
          >
            {loading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text className='text-white text-center text-[18px] font-semibold'>
                Đăng ký
              </Text>
            )}
          </TouchableOpacity>

          <View className='mt-2 items-center'>
            <TouchableOpacity
              className='py-2'
              onPress={() => navigation.goBack()}
            >
              <Text className='text-blue-500'>
                Đã có tài khoản? Đăng nhập ngay!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const generateOTP = () => {
  const length = 6;
  const characters = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return otp;
};

export default RegisterScreen;
