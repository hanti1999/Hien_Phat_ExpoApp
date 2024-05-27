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
import { Entypo, AntDesign } from '@expo/vector-icons';
import React from 'react';
import { notification } from '../assets/data/notification';

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
      <Navigation navigation={navigation} />
      <ScrollView className='bg-gray-100 flex h-full px-2'>
        {notification.map((item, index) => (
          <View key={index} className='my-2 border-b border-gray-200'>
            <Text className='font-semibold uppercase text-base'>
              {item.title}
            </Text>
            {item.content.map((i, index) => (
              <View className='flex-row gap-1 items-center' key={index}>
                <AntDesign name='check' size={14} color='black' />
                <Text>{i}</Text>
              </View>
            ))}
            <View className='my-4'>
              <Text className='text-gray-500 text-sm'>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const Navigation = ({ navigation }) => {
  return (
    <View className='flex flex-row items-center'>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name='chevron-thin-left' size={24} style={{ padding: 10 }} />
      </Pressable>
      <Text className='font-bold text-lg'>Thông báo</Text>
    </View>
  );
};

export default NotificationScreen;
