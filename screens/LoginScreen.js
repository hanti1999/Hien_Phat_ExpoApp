import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  return (
    <SafeAreaView className='flex-1 items-center bg-white'>
      <View>
        <Image
          className='w-20 h-20'
          source={require('../assets/favicon.png')}
        />
      </View>

      <KeyboardAvoidingView>
        <View className='items-center'>
          <Text className='text-xl font-bold'>Đăng nhập</Text>
        </View>

        <View className='mt-24'>
          <View className='flex-row items-center gap-1 bg-gray-200 py-1 rounded'>
            <AntDesign name='mobile1' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-base'
              placeholder='Nhập số điện thoại...'
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
        </View>

        <View className='mt-10'>
          <View className='flex-row items-center gap-1 bg-gray-200 py-1 rounded'>
            <AntDesign name='lock1' size={24} color='gray' />
            <TextInput
              className='w-[300px] text-base'
              placeholder='Nhập mật khẩu...'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View className='flex-row mt-2 items-center justify-between'>
          <Text>Ghi nhớ tài khoản</Text>

          <Text className='text-blue-500 font-medium'>Quên mật khẩu?</Text>
        </View>

        <View className='mt-20'>
          <Pressable className='w-[200px] bg-[#302671] rounded mx-auto px-4 py-4'>
            <Text className='text-white text-center text-lg font-bold'>
              Đăng nhập
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Register')}
            className='mt-4'
          >
            <Text className='text-center text-gray-500'>
              Chưa có tài khoản? Đăng ký ngay!
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
