import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { BASE_URL } from '@env';
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
      const res = await axios.get(`${BASE_URL}/notification`);
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
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == 'android' ? 0 : 0,
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
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
    <View className='bg-white p-2 mb-2'>
      <Text className='font-semibold uppercase text-base'>{item?.title}</Text>
      {item?.content.map((i, index) => (
        <View
          style={{ gap: 4, flexDirection: 'row', alignItems: 'center' }}
          key={index}
        >
          <AntDesign name='minus' size={14} color='black' />
          <Text className='text-[16px]'>{i}</Text>
        </View>
      ))}
      <View className='mt-4'>
        <Text className='text-gray-500 text-sm'>
          {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export default NotificationScreen;
