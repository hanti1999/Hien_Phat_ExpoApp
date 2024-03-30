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
import axios from 'axios';
import { BASE_URL } from '../config';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const { name, loginInfo, password, otp } = route.params;

  const handleVerify = () => {
    if (code != otp) {
      Alert.alert('Lỗi', 'Mã xác minh không trùng khớp!');
      return;
    }

    const info = {
      name: name,
      loginInfo: loginInfo,
      password: password,
    };

    const postRegister = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/register`, info);
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Lỗi', 'Đăng ký không thành công!');
        console.log(error);
      }
    };
    postRegister();
  };
  return (
    <SafeAreaView className='bg-white flex-1 items-center'>
      <View className='my-8'>
        <Text className='text-center text-xl font-bold'>Xác minh OTP</Text>
      </View>

      <KeyboardAvoidingView>
        <View className='bg-gray-200 rounded-md py-1 flex gap-1 items-center'>
          <TextInput
            className='w-[300px] text-base py-1 '
            keyboardType='numeric'
            placeholder='Nhập mã xác minh ...'
            maxLength={6}
            value={code}
            onChangeText={(text) => setCode(text)}
          />
        </View>

        <View className='mt-8'>
          <Pressable
            onPress={handleVerify}
            className='w-[200px] bg-primary-pink rounded-md mx-auto px-4 py-4'
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
