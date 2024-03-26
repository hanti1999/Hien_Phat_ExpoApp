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
import { SliderBox } from 'react-native-image-slider-box';
import React from 'react';

const HomeScreen = () => {
  const list = [
    {
      id: '0',
      image: require('../assets/category-icon/bepGas.png'),
      name: 'Bếp gas',
    },
    {
      id: '1',
      image: require('../assets/category-icon/bepDien.png'),
      name: 'Bếp điện',
    },
    {
      id: '2',
      image: require('../assets/category-icon/giaDung.png'),
      name: 'Gia dụng',
    },
    {
      id: '3',
      image: require('../assets/category-icon/gao.png'),
      name: 'Gạo',
    },
    {
      id: '4',
      image: require('../assets/category-icon/phuKien.png'),
      name: 'Phụ kiện',
    },
    {
      id: '5',
      image: require('../assets/category-icon/nuoc.png'),
      name: 'Nước',
    },
  ];

  const slider = [
    require('../assets/slider-img/slider1.png'),
    require('../assets/slider-img/slider2.png'),
    require('../assets/slider-img/slider3.png'),
  ];
  return (
    <SafeAreaView
      className='bg-white flex-1'
      style={{ paddingTop: Platform.OS == 'android' ? 40 : 0 }}
    >
      <ScrollView>
        <View className='bg-primary-pink'>
          <Pressable className='flex-row items-center bg-white h-10 rounded mx-4 my-2.5'>
            <Ionicons
              style={{ paddingHorizontal: 10 }}
              name='search'
              size={24}
              color='gray'
            />
            <TextInput
              className='text-base flex-1'
              placeholder='Bạn cần tìm gì?'
            />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable key={index} className='m-1'>
              <Image
                resizeMode='contain'
                className='w-20 h-20'
                source={item?.image}
              />
              <Text className='text-center font-medium'>{item?.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <SliderBox
          images={slider}
          autoplay
          circleLoop
          dotColor={'#302671'}
          inactiveDotColor='#333'
          ImageComponentStyle={{ width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
