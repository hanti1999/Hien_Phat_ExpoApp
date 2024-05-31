import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { notification } from '../assets/data/notification';
import ScreenHeader from '../components/ScreenHeader';

const NotificationScreen = () => {
  const navigation = useNavigation();
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
          <View
            key={index}
            className='bg-white p-2 mb-2 border-b border-gray-200'
          >
            <Text className='font-semibold uppercase text-base'>
              {item.title}
            </Text>
            {item.content.map((i, index) => (
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
              <Text className='text-gray-500 text-sm'>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
