import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { EXPO_PUBLIC_API } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';

const EditProfileScreen = ({ route }) => {
  const { currentUser } = route?.params;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber);
  const [password, setPassword] = useState(currentUser?.password);
  const [address, setAddress] = useState(currentUser?.address);
  const [name, setName] = useState(currentUser?.name);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const userData = {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        password: password,
      };
      const url = `${EXPO_PUBLIC_API}/user/update/${currentUser._id}`;
      const res = await axios.patch(url, userData);
      if (res.status === 200) {
        Toast.show({ text1: 'Cập nhật thông tin thành công' });
      } else {
        Toast.show({ type: 'error', text1: 'Cập nhật không thành công' });
      }
    } catch (error) {
      console.log('Lỗi (EditProfileScreen)', error);
      Toast.show({ type: 'error', text1: 'Cập nhật không thành công' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader text='Sửa hồ sơ' />
      <View className='bg-gray-100 flex-1'>
        <View className='px-3 pb-2 bg-white'>
          <Text className='my-3 font-semibold text-[16px]'>Họ và tên:</Text>
          <TextInput
            value={name}
            placeholder='Nhập tên của bạn...'
            className='py-2 border-b border-gray-300 text-[16px]'
            onChangeText={setName}
          />
          <Text className='my-3 font-semibold text-[16px]'>Số điện thoại:</Text>
          <TextInput
            value={phoneNumber}
            placeholder='Bạn chưa nhập số điện thoại...'
            className='py-2 border-b border-gray-300 text-[16px]'
            onChangeText={setPhoneNumber}
          />
          <Text className='my-3 font-semibold text-[16px]'>
            Địa chỉ giao hàng:
          </Text>
          <TextInput
            value={address}
            multiline
            placeholder='Thêm địa chỉ giao hàng...'
            className='py-2 border-b border-gray-300 text-[16px]'
            onChangeText={setAddress}
          />

          <Text className='my-3 font-semibold text-[16px]'>Mật khẩu:</Text>
          <View className='border-b border-gray-300 flex-row items-center justify-between'>
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
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
