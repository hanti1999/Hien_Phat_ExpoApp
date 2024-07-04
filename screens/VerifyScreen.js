import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { BASE_URL } from '@env';
import axios from 'axios';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState('');
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
        const res = await axios.post(`${BASE_URL}/register`, info);
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Lỗi', 'Đăng ký không thành công!');
        console.log('Lỗi (VerifyScreen): ', error);
      }
    };
    postRegister();
  };
  return (
    <SafeAreaView className='bg-white flex-1 items-center'>
      <View className='my-8'>
        <Text className='text-center text-xl font-bold'>Xác minh OTP</Text>
      </View>

      <View>
        <Text className='text-center'>
          Vui lòng kiểm tra mã OTP được gửi đến {loginInfo}
        </Text>
      </View>

      <KeyboardAvoidingView>
        <View className='bg-gray-200 rounded-md py-1 flex my-8'>
          <TextInput
            className='w-[300px] text-base p-2 '
            keyboardType='numeric'
            placeholder='Nhập mã xác minh ...'
            maxLength={6}
            value={code}
            onChangeText={(text) => setCode(text)}
          />
        </View>

        <View>
          <Pressable
            onPress={handleVerify}
            className='w-[300px] bg-primary-pink rounded-md py-4'
          >
            <Text className='text-white text-center text-lg font-bold'>
              Xác minh
            </Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            className='mt-4'
          >
            <Text className='text-center text-gray-500'>Quay về đăng nhập</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({});
