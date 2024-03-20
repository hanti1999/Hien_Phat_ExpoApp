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
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const VerifyScreen = ({ route }) => {
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const { phone } = route.params;
  const url = 'http://192.168.2.14:8000/verify';

  useEffect(() => {
    Alert.alert(
      'Thông báo',
      'Tính năng này đang phát triển, ấn nút xác minh để đăng nhập'
    );
    // Mở lại khi mua Twilio
    // axios
    //   .post(url, { phone: phone })
    //   .then((res) => {
    //     const result = res.json();
    //     setOtp(result.otp);
    //     Alert.alert('Thành công!', 'Gửi mã xác minh thành công');
    //   })
    //   .catch((err) => {
    //     Alert.alert('Lỗi', 'Gửi mã Xác minh không thành công!');
    //     console.log(err);
    //   });
  }, [url]);

  const handleVerify = () => {
    if (code === otp) {
      navigation.navigate('Login');
    } else if (code != otp) {
      Alert.alert('Lỗi', 'Mã xác minh không trùng khớp');
    }
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
            editable={false}
          />
        </View>

        <View className='mt-8'>
          <Pressable
            onPress={handleVerify}
            className='w-[200px] bg-[#302671] rounded-md mx-auto px-4 py-4'
          >
            <Text className='text-white text-center text-lg font-bold'>
              Xác minh
            </Text>
          </Pressable>
        </View>

        {/* <View>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            className='mt-4'
          >
            <Text className='text-center text-gray-500'>Quay về đăng nhập</Text>
          </Pressable>
        </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({});
