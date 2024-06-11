import {
  Text,
  Image,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import HorizontalCategory from '../components/HorizontalCategory';
import ProductTitle from '../components/ProductTitle';
import ProductCard from '../components/ProductCard';
import SeeMoreCard from '../components/SeeMoreCard';
import SearchBar from '../components/SearchBar';
import slider from '../assets/data/slider';
import { UserType } from '../userContext';
import {
  mayLocNuoc,
  mayHutMui,
  bepDien,
  bepGas,
  sale,
} from '../assets/data/productData';

const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const decodeToken = jwtDecode(token);
        const uId = decodeToken.userId;
        setUserId(uId);
      } catch (error) {
        console.log('Lỗi (catch HomeScreen - authToken): ', error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <SafeAreaView
      className=' flex-1 bg-primary-pink'
      style={{ paddingTop: Platform.OS == 'android' ? 0 : 0 }}
    >
      <StatusBar />
      <ScrollView stickyHeaderIndices={[0]} className='bg-gray-100'>
        <SearchBar />

        <HorizontalCategory />

        <SliderBox
          images={slider}
          autoplay
          circleLoop
          dotColor={'#302671'}
          inactiveDotColor='#333'
          ImageComponentStyle={{ width: '100%' }}
        />

        <View className='flex-row items-center justify-between bg-white py-1'>
          <Image
            className='w-12 h-12'
            source={require('../assets/daisy.png')}
          />
          <Text className='font-bold text-2xl text-red-500 '>
            Ưu đãi quá trời!
          </Text>
          <Image
            className='w-12 h-12'
            source={require('../assets/daisy.png')}
          />
        </View>

        <ScrollView horizontal className='bg-white pl-2'>
          {/* {sale.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))} */}
          <SeeMoreCard />
        </ScrollView>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Bếp gas'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {/* {bepGas.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))} */}
            <SeeMoreCard />
          </ScrollView>
        </View>

        <View>
          <Pressable onPress={() => Alert.alert('Thông báo', 'Clicked')}>
            <Image
              className='w-full h-[60px]'
              source={require('../assets/sale8-3.jpg')}
            />
          </Pressable>
        </View>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Bếp điện'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {/* {bepDien.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))} */}
            <SeeMoreCard />
          </ScrollView>
        </View>

        <View>
          <Pressable onPress={() => Alert.alert('Thông báo', 'Clicked')}>
            <Image
              className='w-full h-[140px]'
              source={require('../assets/DonTetSaleHet_MayLocNuoc.png')}
            />
          </Pressable>
        </View>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Máy lọc nước'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {/* {mayLocNuoc.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))} */}
            <SeeMoreCard />
          </ScrollView>
        </View>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Máy hút mùi'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {/* {mayHutMui.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))} */}
            <SeeMoreCard />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
