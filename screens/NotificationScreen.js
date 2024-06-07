import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import Loading from '../components/Loading';
import { BASE_URL } from '../config';

const NotificationScreen = () => {
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/notification`);
        const notification = res.data?.notification;
        setNotification(notification);
        setLoading(false);
      } catch (error) {
        console.log('Lỗi (NotificationScreen)', error);
      }
    };

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
      <ScrollView className='bg-gray-100 flex h-full'>
        {notification.map((item, index) => (
          <View key={index} className='bg-white p-2 mb-2'>
            <Text className='font-semibold uppercase text-base'>
              {item?.title}
            </Text>
            {item?.content.map((i, index) => (
              <View
                style={{ gap: 4 }}
                className='flex-row items-center'
                key={index}
              >
                <AntDesign name='minus' size={14} color='black' />
                <Text>{i}</Text>
              </View>
            ))}
            <View className='mt-4'>
              <Text className='text-gray-500 text-sm'>
                {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
