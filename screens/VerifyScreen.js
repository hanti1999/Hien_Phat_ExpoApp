import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const VerifyScreen = ({ route }) => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const { phone } = route.params;

  const handleVerify = () => {
    // const info = {
    //   phone: phone,
    //   code: code,
    // };
    // axios
    //   .post('http://192.168.2.14:8000/verify', info)
    //   .then((res) => {
    //     console.log(res);
    //     Alert.alert('Xác minh thành công!', 'Thành công');
    //     navigation.navigate('Login');
    //   })
    //   .catch((err) => {
    //     Alert.alert('Gửi mã không thành công!', 'Lỗi');
    //     console.log(err);
    //   });
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
            className='w-[200px] bg-[#302671] rounded-md mx-auto px-4 py-4'
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
