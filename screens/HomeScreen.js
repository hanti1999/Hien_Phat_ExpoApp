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
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from 'react-native-image-slider-box';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '@env';
import axios from 'axios';
import ProductTitle from '../components/ProductTitle';
import ProductCard from '../components/ProductCard';
import SeeMoreCard from '../components/SeeMoreCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import slider from '../assets/data/slider';
import { UserType } from '../userContext';

const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState();

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/product`);
        if (res.status === 200) {
          setProduct(res?.data?.product);
          setLoading(false);
          console.log('Fetch sản phẩm thành công');
        } else {
          setLoading(false);
          console.log('Lỗi!, không fetch được sản phẩm');
        }
      } catch (error) {
        setLoading(false);
        console.log('Lỗi HomeScreen - fet Products', error);
      }
    };

    fetchProducts();
  }, []);

  let bepGas = products?.filter(
    (product) => product.category.name === 'Bếp gas'
  );

  let bepDien = products?.filter(
    (product) => product.category.name === 'Bếp điện'
  );

  let giaDung = products?.filter(
    (product) => product.category.name === 'Gia dụng'
  );

  let khac = products?.filter((product) => product.category.name === 'Gas');

  if (loading) {
    return <Loading />;
  }

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
            {bepGas.slice(0, 6).map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
            <SeeMoreCard categoryId='6666d75349ada55e0903d7ec' />
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
          <ProductTitle text={'Gia dụng'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {/* {mayLocNuoc.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))} */}
            <SeeMoreCard />
          </ScrollView>
        </View>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Gas'} />

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

const HorizontalCategory = () => {
  const [catList, setCatList] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/category`);

        if (res.status === 200) {
          const cat = res.data.category;
          setCatList(cat);
          setLoading(false);
          console.log('Fetch category thành công');
        } else {
          setLoading(false);
          console.log('Lỗi, fetch category không thành công');
        }
      } catch (error) {
        setLoading(false);
        console.log('Lỗi Horizontal category', error);
      }
    };

    fetchCategory();
  }, []);

  if (loading) {
    return (
      <View className='h-[84px] flex justify-center'>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {catList?.map((item, index) => (
        <Pressable
          onPress={() =>
            navigation.navigate('ProductByCategory', {
              categoryId: item._id,
            })
          }
          key={index}
          className='m-1'
        >
          <Image
            resizeMode='contain'
            className='w-20 h-20'
            source={{ uri: item?.image }}
          />
          <Text className='text-center font-medium'>{item?.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
