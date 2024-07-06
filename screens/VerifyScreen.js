import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { BASE_URL } from '@env';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, loginInfo, password, address, phoneNumber, otp } =
    route?.params;

  const handleVerify = () => {
    if (code != otp) {
      Alert.alert('Lỗi', 'Mã xác minh không trùng khớp!');
      return;
    }

    const info = {
      name: name,
      loginInfo: loginInfo,
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
          console.log('Đăng ký thành công');
          navigation.navigate('Login');
        } else {
          setLoading(false);
          console.log('Đăng ký không thành công (VerifyScreen)');
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('Lỗi', 'Đăng ký không thành công!');
        console.log('Lỗi (VerifyScreen): ', error);
      }
    };
    postRegister();
  };

  return (
    <SafeAreaView className='bg-white flex-1 items-center'>
      <StatusBar />
      <View className='my-8'>
        <Text className='text-center text-[20px] font-bold'>Xác minh OTP</Text>
      </View>

      <Text className='text-center'>
        Vui lòng kiểm tra mã OTP được gửi đến {loginInfo}
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

        <Pressable
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
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Login')}
          className='mt-2'
        >
          <Text className='text-center text-blue-500'>Quay về đăng nhập</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({});
