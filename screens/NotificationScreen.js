import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { EXPO_PUBLIC_API } from '@env';
import moment from 'moment';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import Loading from '../components/Loading';

const NotificationScreen = () => {
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
      const res = await axios.get(`${EXPO_PUBLIC_API}/notification`);
      if (res.status === 200) {
        const notification = res.data?.notification;
        setNotification(notification);
        setLoading(false);
        console.log('Fetch thông báo thành công');
      } else {
        setLoading(false);
        console.log('Fetch thông báo không thành công');
      }
    } catch (error) {
      console.log('Lỗi (NotificationScreen)', error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar />
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
      <FlatList
        data={item?.content}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={{ gap: 4, flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='minus' size={14} color='black' />
            <Text className='text-[16px]'>{item}</Text>
          </View>
        )}
      />
      <View className='mt-4'>
        <Text className='text-gray-500 text-[14px]'>
          {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export default NotificationScreen;
