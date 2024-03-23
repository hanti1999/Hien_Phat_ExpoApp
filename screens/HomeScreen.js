import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const HomeScreen = () => {
  const list = [
    {
      id: '0',
      image: require('../assets/200x200.png'),
      name: 'Bếp gas',
    },
    {
      id: '1',
      image: require('../assets/200x200.png'),
      name: 'Bếp điện',
    },
    {
      id: '2',
      image: require('../assets/200x200.png'),
      name: 'Bếp gas',
    },
    {
      id: '3',
      image: require('../assets/200x200.png'),
      name: 'Bếp điện',
    },
    {
      id: '4',
      image: require('../assets/200x200.png'),
      name: 'Bếp điện',
    },
    {
      id: '5',
      image: require('../assets/200x200.png'),
      name: 'Bếp điện',
    },
  ];
  return (
    <SafeAreaView
      className='bg-white flex-1'
      style={{ paddingTop: Platform.OS == 'android' ? 40 : 0 }}
    >
      <ScrollView>
        <View className='bg-[#302671]'>
          <Pressable className='flex-row items-center bg-white h-10 rounded mx-4 my-2.5'>
            <Ionicons
              style={{ paddingHorizontal: 10 }}
              name='search'
              size={24}
              color='black'
            />
            <TextInput
              className='text-base flex-1'
              placeholder='Bạn cần tìm gì?'
            />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable key={index} className='border-r border-b'>
              <Image
                resizeMode='contain'
                className='w-20 h-20'
                source={item.image}
              />
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
