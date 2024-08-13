import {
  SafeAreaView,
  Text,
  View,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { EXPO_PUBLIC_API } from '@env';
import moment from 'moment';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import NoProduct from '../components/NoProduct';
import Loading from '../components/Loading';
import { UserType } from '../userContext';

const NotificationScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotification();
    setRefreshing(false);
  };

  const fetchNotification = async () => {
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API}/user/${userId}`);
      if (res.status === 200) {
        const notification = res.data?.user.notification;
        setNotification(notification);
        setLoading(false);
        console.log('Fetch thông báo thành công');
      } else {
        setLoading(false);
        console.error('Fetch thông báo không thành công');
      }
    } catch (error) {
      console.error('Lỗi (NotificationScreen)', error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (notification.length === 0) {
    return <NoProduct text={'Tạm chưa có thông báo'} />;
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader text={'Thông báo'} />

      <FlatList
        data={notification}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={{ backgroundColor: 'rgb(243 244 246)' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const renderItem = ({ item }) => {
  return (
    <View className='bg-white py-2 px-3 mb-2'>
      <Text className='font-semibold uppercase text-[16px]'>{item?.title}</Text>
      <Text className='text-[15px]'>
        Vào phần <Text className='underline'>Tài khoản</Text>
        <AntDesign name='arrowright' size={16} color='black' />
        <Text className='underline'>Đơn hàng của bạn</Text> để xem chi tiết
      </Text>
      <View className='mt-4'>
        <Text className='text-gray-500 text-[14px]'>
          {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export default NotificationScreen;
