import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Modal,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  FontAwesome,
  AntDesign,
  Ionicons,
  Foundation,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { EXPO_PUBLIC_API } from '@env';
import axios from 'axios';
import { clearCart } from '../redux/slices/CartReducer';
import ScreenHeader from '../components/ScreenHeader';
import Loading from '../components/Loading';
import { UserType } from '../userContext';
import openLink from '../utils/openLink';

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserProfile();
    setRefreshing(false);
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API}/user/${userId}`);
      if (res.status === 200) {
        const user = res.data.user;
        setCurrentUser(user);
      } else {
        console.error('Fetch thông tin người dùng không thành công');
      }
    } catch (error) {
      console.error('Lỗi (catch ProfileScreen): ', error);
    } finally {
      setLoading(false);
    }
  };

  const openZalo498 = async () => {
    openLink('https://zalo.me/0986359498');
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView
        stickyHeaderIndices={[0]}
        className='bg-gray-100 flex-1'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ScreenHeader text={'Tài khoản'} />
        <View
          style={{ gap: 12 }}
          className='py-2 px-3 flex-row items-center bg-white'
        >
          {currentUser?.image != '' ? (
            <Image
              className='w-20 h-20 rounded-full border border-primary-pink'
              source={{ uri: currentUser?.image }}
            />
          ) : (
            <View className='bg-primary-pink flex justify-center items-center w-20 h-20 rounded-full'>
              <FontAwesome name='user-o' size={40} color='white' />
            </View>
          )}
          <View>
            <Text className='text-xl font-semibold'>{currentUser?.name}</Text>
            <Text className='font-semibold'>
              {currentUser?.points?.toLocaleString()} điểm
            </Text>
            <Text className='text-gray-500'>{currentUser?.phoneNumber}</Text>
          </View>
        </View>

        <View className='py-2 px-3 mt-2 bg-white'>
          <Pressable
            onPress={() =>
              navigation.navigate('EditProfile', {
                currentUser: currentUser,
              })
            }
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 8 }} className='flex-row items-center'>
              <View className='w-6'>
                <AntDesign name='user' size={24} color='black' />
              </View>
              <Text className='text-base'>Sửa thông tin cá nhân</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate('Order', {
                userId: userId,
              })
            }
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 8 }} className='flex-row items-center'>
              <View className='w-6'>
                <FontAwesome name='list-alt' size={24} color='black' />
              </View>
              <Text className='text-base'>Đơn hàng của bạn</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate('Wishlist', {
                wishlist: currentUser?.wishlist,
                userId: userId,
              })
            }
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 8 }} className='flex-row items-center'>
              <View className='w-6'>
                <FontAwesome name='heart-o' size={24} color='black' />
              </View>
              <Text className='text-base'>Danh sách yêu thích</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>
        </View>

        <View className='py-2 px-3 mt-2 bg-white'>
          <Pressable
            onPress={() => navigation.navigate('About')}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 8 }} className='flex-row items-center'>
              <View className='w-6'>
                <FontAwesome name='building-o' size={24} color='black' />
              </View>
              <Text className='text-base'>Thông tin công ty</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>

          <Pressable
            onPress={openZalo498}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 8 }} className='flex-row items-center'>
              <View className='w-6'>
                <Foundation name='map' size={24} color='black' />
              </View>
              <Text className='text-base'>Tìm cửa hàng</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>

          <Pressable
            onPress={() => openLink('https://zalo.me/0986359498')}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 8 }} className='flex-row items-center'>
              <View className='w-6'>
                <FontAwesome name='bug' size={24} color='black' />
              </View>
              <Text className='text-base'>Báo lỗi ứng dụng</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>
        </View>

        <View className='py-2 px-3 bg-white mt-2'>
          <LogoutButton />
        </View>

        <View className='mt-10'>
          <View className='flex-row'>
            <View className='w-1/2'></View>
            <View className='w-1/2'>
              <Text className='text-gray-500'>Gas Hiền Phát - v{'0.0.11'}</Text>
              <Text className='mt-1 text-gray-500'>
                Thiết kế và phát triển bởi:
              </Text>
              <Text className='text-gray-500'>Tích Chu (Manager)</Text>
              <TouchableOpacity onPress={openZalo498}>
                <Text className=' text-blue-400 underline'>
                  N.T.Hoàng Anh (Front-end)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openLink('https://zalo.me/0378447864')}
              >
                <Text className=' text-blue-400 underline'>
                  Vũ Thắng (Back-end)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LogoutButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    clearAuthToken();
    dispatch(clearCart());
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.replace('Login');
  };

  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{ backgroundColor: 'rgba( 0, 0, 0, 0.3)' }}
          className='flex-1 items-center justify-center'
        >
          <View className='p-2 rounded-xl bg-white shadow-lg'>
            <Text className='text-center my-4 text-[16px]'>
              Bạn muốn đăng xuất?
            </Text>
            <View style={{ gap: 8 }} className='flex-row items-center'>
              <TouchableOpacity
                className='rounded-full w-32 h-10 justify-center border-primary-pink border'
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className='text-center text-[16px]'>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='rounded-full w-32 h-10 justify-center bg-primary-pink border-primary-pink border'
                onPress={handleLogout}
              >
                <Text className='text-center text-[16px] text-white'>
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <View
          className='flex-row items-center justify-center py-3'
          style={{ gap: 10 }}
        >
          <Ionicons name='log-out-outline' size={26} color='red' />
          <Text className='text-red-500 font-semibold text-lg'>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ProfileScreen;
