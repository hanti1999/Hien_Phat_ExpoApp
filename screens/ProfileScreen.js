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
          className='p-2 flex-row items-center bg-white'
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

        <View className='p-2 mt-2 bg-white'>
          <Pressable
            onPress={() =>
              navigation.navigate('EditProfile', {
                currentUser: currentUser,
              })
            }
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <AntDesign name='user' size={24} color='black' />
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
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <FontAwesome name='list-alt' size={24} color='black' />
              <Text className='text-base'>Đơn hàng của bạn</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>
        </View>

        <View className='p-2 mt-2 bg-white'>
          <Pressable
            onPress={() => Alert.alert('Thông báo', 'Đang phát triển')}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <FontAwesome name='building-o' size={24} color='black' />
              <Text className='text-base'>Thông tin công ty</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable>

          {/* <Pressable
            onPress={() => Alert.alert('Thông báo', 'Đang phát triển')}
            className='flex-row items-center justify-between py-3'
          >
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <FontAwesome name='file-text-o' size={24} color='black' />
              <Text className='text-base'>Điều khoản và chính sách</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </Pressable> */}

          <OpenURLButton url='https://maps.app.goo.gl/kpnCoJAakPAB4ZJE7'>
            <View style={{ gap: 10 }} className='flex-row items-center'>
              <Foundation name='map' size={24} color='black' />
              <Text className='text-base'>Tìm cửa hàng</Text>
            </View>
            <AntDesign name='right' size={16} color='black' />
          </OpenURLButton>
        </View>

        <View className='p-2 bg-white mt-2'>
          <LogoutButton />
        </View>

        <View className='px-2 py-4'>
          <Text className='text-center text-gray-500'>
            Gas Hiền Phát - v{'1.0.0'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const OpenURLButton = ({ url, children }) => {
  const handlePress = async () => {
    const canOpenURL = await Linking.canOpenURL(url);

    if (canOpenURL) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Không thể mở URL: ${url}`);
    }
  };
  return (
    <Pressable
      onPress={handlePress}
      className='flex-row items-center justify-between py-3'
    >
      {children}
    </Pressable>
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
          <View className=' p-2 rounded-xl bg-white shadow-lg'>
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
