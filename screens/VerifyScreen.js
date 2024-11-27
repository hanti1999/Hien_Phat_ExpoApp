import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, { useState } from 'react';
import { EXPO_PUBLIC_API } from '@env';
import axios from 'axios';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, password, address, phoneNumber, otp } = route?.params;

  const handleVerify = async () => {
    if (code != otp) {
      Toast.show({ type: 'error', text1: 'Mã xác minh không trùng khớp' });
      return;
    }

    try {
      setLoading(true);
      const data = {
        name: name,
        password: password,
        address: address,
        phoneNumber: phoneNumber,
      };
      const res = await axios.post(`${EXPO_PUBLIC_API}/auth/register`, data);
      if (res.status === 201) {
        Toast.show({ text1: 'Đăng ký thành công' });
        navigation.navigate('Login');
      } else {
        Toast.error({ type: 'error', text1: 'Đăng ký không thành công' });
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Đăng ký không thành công' });
      console.error('Lỗi (VerifyScreen): ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='bg-white flex-1 items-center px-2'>
      <View className='my-8'>
        <Text className='text-center text-[20px] font-bold'>Xác minh OTP</Text>
      </View>

      <Text className='text-center'>
        Vui lòng kiểm tra mã OTP được gửi đến Zalo {phoneNumber}
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL(`https://zaloapp.com/`)}>
        <Text className='text-blue-500 underline text-center text-lg'>
          Ấn để mở Zalo
        </Text>
      </TouchableOpacity>

      <KeyboardAvoidingView>
        <View className='border-b border-gray-300 py-1 flex my-8'>
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
          disabled={loading}
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
