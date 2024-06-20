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
import { BASE_URL } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';

const EditProfileScreen = ({ route }) => {
  const { currentUser } = route?.params;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const userData = {
        userId: currentUser._id,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
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

  useEffect(() => {
    setName(currentUser?.name);
    setAddress(currentUser?.address);
    setPhoneNumber(currentUser?.phoneNumber);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <StatusBar />
      <ScreenHeader text='Sửa hồ sơ' />
      <View className='bg-gray-100 flex-1'>
        <View className='px-2 pb-2 bg-white'>
          <Text className='my-3 text-[16px]'>Họ và tên:</Text>
          <TextInput
            value={name}
            placeholder='Nhập tên của bạn...'
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
            onChangeText={setName}
          />
          <Text className='my-3 text-[16px]'>Số điện thoại:</Text>
          <TextInput
            value={phoneNumber}
            placeholder='Bạn chưa nhập số điện thoại...'
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
            onChangeText={setPhoneNumber}
          />
          <Text className='my-3 text-[16px]'>Địa chỉ giao hàng:</Text>
          <TextInput
            value={address}
            placeholder='Thêm địa chỉ giao hàng...'
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
            onChangeText={setAddress}
          />

          <Pressable
            onPress={handleUpdateProfile}
            disabled={loading}
            className='w-full h-[60px] flex justify-center mt-3 bg-primary-pink rounded-xl'
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
