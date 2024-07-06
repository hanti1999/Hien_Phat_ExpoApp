import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';

const EditProfileScreen = ({ route }) => {
  const { currentUser } = route?.params;
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const userData = {
        userId: currentUser._id,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        password: password,
      };
      const res = await axios.post(`${BASE_URL}/profile/update`, userData);
      if (res.status === 200) {
        setLoading(false);
        Alert.alert('Thông báo', 'Cập nhật thông tin thành công!');
        console.log('Cập nhật thông tin thành công');
      } else {
        setLoading(false);
        console.log('Cập nhật thông tin không thành công (EditProfileScreen)');
      }
    } catch (error) {
      setLoading(false);
      console.log('Lỗi (EditProfileScreen)', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setName(currentUser?.name);
    setAddress(currentUser?.address);
    setPhoneNumber(currentUser?.phoneNumber);
    setPassword(currentUser?.password);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar />
      <ScreenHeader text='Sửa hồ sơ' />
      <View className='bg-gray-100 flex-1'>
        <View className='px-3 pb-2 bg-white'>
          <Text className='my-3 text-[16px]'>Họ và tên:</Text>
          <TextInput
            value={name}
            placeholder='Nhập tên của bạn...'
            className='p-2 border-b border-gray-300 text-[16px]'
            onChangeText={setName}
          />
          <Text className='my-3 text-[16px]'>Số điện thoại:</Text>
          <TextInput
            value={phoneNumber}
            placeholder='Bạn chưa nhập số điện thoại...'
            className='p-2 border-b border-gray-300 text-[16px]'
            onChangeText={setPhoneNumber}
          />
          <Text className='my-3 text-[16px]'>Địa chỉ giao hàng:</Text>
          <TextInput
            value={address}
            multiline
            placeholder='Thêm địa chỉ giao hàng...'
            className='p-2 border-b border-gray-300 text-[16px]'
            onChangeText={setAddress}
          />

          <Text className='my-3 text-[16px]'>Mật khẩu của bạn:</Text>
          <View className='px-2 border-b border-gray-300 flex-row items-center justify-between'>
            <TextInput
              value={password}
              placeholder='Thêm địa chỉ giao hàng...'
              className='py-3 text-[16px]'
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={{ flex: 1 }}
            />
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color='gray'
              onPress={toggleShowPassword}
            />
          </View>

          <Pressable
            onPress={handleUpdateProfile}
            disabled={loading}
            className='w-full h-[60px] flex justify-center mt-3 bg-primary-pink rounded-xl '
          >
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text className='text-[18px] text-white font-semibold text-center'>
                Cập nhật
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
