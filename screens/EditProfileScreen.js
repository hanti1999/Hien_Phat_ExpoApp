import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';

const EditProfileScreen = ({ route, navigation }) => {
  const { currentUser } = route?.params;

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <StatusBar />
      <ScreenHeader text='Sửa hồ sơ' />
      <View className='bg-gray-100 flex-1'>
        <View className='px-2 pb-2 bg-white'>
          <Text className='my-3 text-[16px]'>Họ và tên:</Text>
          <TextInput
            value={currentUser?.name}
            placeholder='Nhập tên của bạn...'
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
          />
          <Text className='my-3 text-[16px]'>Số điện thoại:</Text>
          <TextInput
            value={currentUser?.phoneNumber}
            placeholder='Bạn chưa nhập số điện thoại...'
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
          />
          <Text className='my-3 text-[16px]'>Địa chỉ giao hàng:</Text>
          <TextInput
            value={currentUser?.address}
            placeholder='Thêm địa chỉ giao hàng...'
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
          />

          <Pressable className='py-3 w-full mt-3 bg-primary-pink flex-row items-center justify-center rounded-xl'>
            <Text className='text-lg text-white font-semibold text-center'>
              Cập nhật
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
