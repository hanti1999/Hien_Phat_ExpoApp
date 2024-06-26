import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Alert,
  Linking,
  Modal,
  ScrollView,
  RefreshControl,
  Dimensions,
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
import { BASE_URL } from '@env';
import axios from 'axios';
import { clearCart } from '../redux/slices/CartReducer';
import ScreenHeader from '../components/ScreenHeader';
import Loading from '../components/Loading';
import { UserType } from '../userContext';

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserProfile();
    setRefreshing(false);
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/${userId}`);
      if (res.status === 200) {
        const user = res.data.user;
        setCurrentUser(user);
        setLoading(false);
        console.log('Fetch thông tin người dùng thành công');
      } else {
        setLoading(false);
        console.log('Fetch thông tin người dùng không thành công');
      }
    } catch (error) {
      console.log('Lỗi (catch ProfileScreen): ', error);
    }
  };

  const handleOpenMap = async () => {
    const canOpenURL = await Linking.canOpenURL(
      'https://maps.app.goo.gl/kpnCoJAakPAB4ZJE7'
    );

    if (canOpenURL) {
      await Linking.openURL('https://maps.app.goo.gl/kpnCoJAakPAB4ZJE7');
    } else {
      Alert.alert(`Không thể mở URL`);
    }
  };

  const openZalo498 = async () => {
    const canOpenURL = await Linking.canOpenURL('https://zalo.me/0986359498');

    if (canOpenURL) {
      await Linking.openURL('https://zalo.me/0986359498');
    } else {
      Alert.alert(`Không thể mở URL`);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <StatusBar />
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
          <View className='bg-primary-pink flex justify-center items-center w-20 h-20 rounded-full'>
            <FontAwesome name='user-o' size={40} color='white' />
          </View>
          <View>
            <Text className='text-xl font-semibold'>{currentUser?.name}</Text>
            <Text className='font-semibold'>
              {currentUser?.points?.toLocaleString()} điểm
            </Text>
            <Text className='text-gray-500'>{currentUser?.loginInfo}</Text>
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
            onPress={handleOpenMap}
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
            onPress={openZalo498}
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
            <View style={{ width: (width * 50) / 100 }}></View>
            <View style={{ width: (width * 50) / 100 }}>
              <Text className=' text-gray-500'>Gas Hiền Phát - v{'1.0.0'}</Text>
              <Text className='mt-1  text-gray-500'>
                Thiết kế và phát triển bởi:
              </Text>
              <Text className=' text-gray-500'>
                Tích Chu (desginer - manager)
              </Text>
              <Pressable onPress={openZalo498}>
                <Text className=' text-blue-400 underline'>
                  N.T.Hoàng Anh (developer)
                </Text>
              </Pressable>
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
    console.log('auth token cleared');
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
          <View className=' py-2 px-3 rounded-xl bg-white shadow-lg'>
            <Text className='text-center my-4 text-[16px]'>
              Bạn muốn đăng xuất?
            </Text>
            <View style={{ gap: 4 }} className='flex-row items-center'>
              <Pressable
                className='rounded-xl w-32 h-10 justify-center border-primary-pink border'
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className='text-center text-[16px]'>Hủy</Text>
              </Pressable>
              <Pressable
                className='rounded-xl w-32 h-10 justify-center bg-primary-pink border-primary-pink border'
                onPress={handleLogout}
              >
                <Text className='text-center text-[16px] text-white'>
                  Đồng ý
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <View
          className='flex-row items-center justify-center py-3'
          style={{ gap: 10 }}
        >
          <Ionicons name='log-out-outline' size={26} color='red' />
          <Text className='text-red-500 font-semibold text-lg'>Đăng xuất</Text>
        </View>
      </Pressable>
    </>
  );
};

export default ProfileScreen;
