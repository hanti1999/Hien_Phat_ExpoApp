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
import { Ionicons, Entypo } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';
import React from 'react';

const list = [
  {
    id: 0,
    image: require('../assets/category-icon/bepGas.png'),
    name: 'Bếp gas',
  },
  {
    id: 1,
    image: require('../assets/category-icon/bepDien.png'),
    name: 'Bếp điện',
  },
  {
    id: 2,
    image: require('../assets/category-icon/giaDung.png'),
    name: 'Gia dụng',
  },
  {
    id: 3,
    image: require('../assets/category-icon/gao.png'),
    name: 'Gạo',
  },
  {
    id: 4,
    image: require('../assets/category-icon/phuKien.png'),
    name: 'Phụ kiện',
  },
  {
    id: 5,
    image: require('../assets/category-icon/nuoc.png'),
    name: 'Nước',
  },
];

const slider = [
  require('../assets/slider-img/slider1.png'),
  require('../assets/slider-img/slider2.png'),
  require('../assets/slider-img/slider3.png'),
];

const sale = [
  {
    id: 0,
    title: 'Bếp gas âm Ogawa OG-207B',
    oldPrice: 1990000,
    price: 1750000,
    image: require('../assets/products/ogawa-og-207b.jpg'),
    carouselImages: [
      require('../assets/products/ogawa-og-207b.jpg'),
      require('../assets/products/ogawa-og-207b.jpg'),
      require('../assets/products/ogawa-og-207b.jpg'),
      require('../assets/products/ogawa-og-207b.jpg'),
    ],
  },
  {
    id: 1,
    title: 'Bếp gas âm SankaTech SKT-795',
    oldPrice: 2490000,
    price: 2190000,
    image: require('../assets/products/sanka-skt-795.jpg'),
    carouselImages: [
      require('../assets/products/sanka-skt-795.jpg'),
      require('../assets/products/sanka-skt-795.jpg'),
      require('../assets/products/sanka-skt-795.jpg'),
      require('../assets/products/sanka-skt-795.jpg'),
    ],
  },
  {
    id: 2,
    title: 'Bếp gas âm Rinnai RVB-2BG',
    oldPrice: 4200000,
    price: 3790000,
    image: require('../assets/products/rinnai-rvb-2bg.jpg'),
    carouselImages: [
      require('../assets/products/rinnai-rvb-2bg.jpg'),
      require('../assets/products/rinnai-rvb-2bg.jpg'),
      require('../assets/products/rinnai-rvb-2bg.jpg'),
      require('../assets/products/rinnai-rvb-2bg.jpg'),
    ],
  },
  {
    id: 3,
    title: 'Bếp gas âm Rinnai 2i',
    oldPrice: 5200000,
    price: 4950000,
    image: require('../assets/products/rinnai-rvb-2iab.jpg'),
    carouselImages: [
      require('../assets/products/rinnai-rvb-2iab.jpg'),
      require('../assets/products/rinnai-rvb-2iab.jpg'),
      require('../assets/products/rinnai-rvb-2iab.jpg'),
      require('../assets/products/rinnai-rvb-2iab.jpg'),
    ],
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView
      className='bg-white flex-1'
      style={{ paddingTop: Platform.OS == 'android' ? 40 : 0 }}
    >
      <ScrollView>
        <SearchBar />

        <Category />

        <SliderBox
          images={slider}
          autoplay
          circleLoop
          dotColor={'#302671'}
          inactiveDotColor='#333'
          ImageComponentStyle={{ width: '100%' }}
        />

        <View className='flex-row items-center justify-between'>
          <Text className='font-bold text-2xl p-2.5 text-primary-blue'>
            Khuyến Mãi Hot
          </Text>
          <Pressable className='flex-row items-center '>
            <Text className='text-blue-400 font-medium'>
              Xem thêm khuyến mãi
            </Text>
            <Entypo name='chevron-right' size={24} color='#60a5fa' />
          </Pressable>
        </View>

        <View className='flex-row flex-wrap items-start justify-evenly'>
          {sale.map((item, index) => (
            <Pressable
              id='product__card'
              key={index}
              className='border mb-3 border-gray-300 rounded-md'
            >
              <Image
                resizeMode='contain'
                className='w-[180px] h-[180px]'
                source={item?.image}
              />
              <View id='product__card-info' className='mx-2 mb-2'>
                <Text className='max-w-[160px]'>{item?.title}</Text>
                <Text className='line-through'>
                  {item?.oldPrice.toLocaleString()}
                </Text>
                <Text className='font-semibold text-red-500 text-lg'>
                  {item?.price.toLocaleString()}đ
                </Text>
              </View>

              <View id='product__card-btn' className='flex justify-items-end'>
                <Pressable className=' bg-primary-pink'>
                  <Text className='text-center py-2 text-white text-lg'>
                    MUA
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const SearchBar = () => {
  return (
    <View className='bg-primary-pink'>
      <Pressable className='flex-row items-center bg-white h-10 rounded-md mx-4 my-2.5'>
        <Ionicons
          style={{ paddingHorizontal: 10 }}
          name='search'
          size={24}
          color='gray'
        />
        <TextInput className='text-base flex-1' placeholder='Bạn cần tìm gì?' />
      </Pressable>
    </View>
  );
};

const Category = () => {
  return (
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
  );
};
