import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { BASE_URL } from '@env';
import axios from 'axios';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, password, address, phoneNumber, otp } = route?.params;

  const handleVerify = () => {
    if (code != otp) {
      Toast.show({ type: 'error', text1: 'Mã xác minh không trùng khớp' });
      return;
    }

    const info = {
      name: name,
      password: password,
      address: address,
      phoneNumber: phoneNumber,
    };

    const postRegister = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`${BASE_URL}/register`, info);
        if (res.status === 201) {
          setLoading(false);
          Toast.show({ text1: 'Đăng ký thành công' });
          navigation.navigate('Login');
        } else {
          setLoading(false);
          Toast.show({ type: 'error', text1: 'Đăng ký không thành công' });
        }
      } catch (error) {
        setLoading(false);
        Toast.show({ type: 'error', text1: 'Đăng ký không thành công' });
        console.log('Lỗi (VerifyScreen): ', error);
      }
    };
    postRegister();
  };

  return (
    <SafeAreaView className='bg-white flex-1 items-center px-2'>
      <StatusBar />
      <View className='my-8'>
        <Text className='text-center text-[20px] font-bold'>Xác minh OTP</Text>
      </View>

      <Text className='text-center'>
        Vui lòng kiểm tra mã OTP được gửi đến {phoneNumber}
      </Text>

      <KeyboardAvoidingView>
        <View className='bg-gray-200 rounded-md py-1 flex my-8'>
          <TextInput
            className='w-[300px] text-[16px] p-2 '
            keyboardType='numeric'
            placeholder='Nhập mã xác minh ...'
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />
        </View>

        <TouchableOpacity
          onPress={handleVerify}
          className='w-[300px] bg-primary-pink rounded-md py-4'
        >
          {loading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text className='text-white text-center text-[18px] font-semibold'>
              Xác minh
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className='mt-2'
        >
          <Text className='text-center text-blue-500'>Quay về đăng nhập</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({});
