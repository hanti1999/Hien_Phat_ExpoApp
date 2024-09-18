import {
  Text,
  Image,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Carousel } from 'react-native-basic-carousel';
import { jwtDecode } from 'jwt-decode';
import { EXPO_PUBLIC_API } from '@env';
import axios from 'axios';
import ProductTitle from '../components/ProductTitle';
import SeeMoreCard from '../components/SeeMoreCard';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import slider from '../assets/data/slider';
import { UserType } from '../userContext';

const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState();
  const width = Dimensions.get('window').width;

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const decodeToken = jwtDecode(token);
        const userId = decodeToken.userId;
        setUserId(userId);
      } catch (error) {
        console.log('Lỗi (catch HomeScreen - authToken): ', error);
      }
    };
    fetchUserId();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API}/product`);
      if (res.status === 200) {
        const data = res?.data?.products;
        setProduct(data);
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

  useEffect(() => {
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

  let phuKien = products?.filter(
    (product) => product.category.name === 'Phụ kiện'
  );

  let sale = products?.filter((product) => product.discount > 10);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className='flex-1 bg-primary-pink'>
      <ScrollView
        stickyHeaderIndices={[0]}
        className='bg-gray-100'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchBar userId={userId} />
        <HorizontalCategory userId={userId} />
        <Carousel
          data={slider}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              source={item}
              style={{
                height: 0.5625 * width,
                aspectRatio: '16/9',
              }}
            />
          )}
          itemWidth={width}
          autoplay
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

        <FlatList
          data={sale?.slice(0, 6)}
          style={{ backgroundColor: 'white', paddingHorizontal: 4 }}
          renderItem={({ item }) => (
            <ProductCard userId={userId} item={item} size={0.45} />
          )}
          keyExtractor={(item) => item?._id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Bếp gas'} />

          <FlatList
            data={bepGas?.slice(0, 6)}
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 4,
              marginTop: 20,
            }}
            renderItem={({ item }) => (
              <ProductCard userId={userId} item={item} size={0.45} />
            )}
            keyExtractor={(item) => item?._id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          <SeeMoreCard
            userId={userId}
            categoryId={'6666d75349ada55e0903d7ec'}
            extraText={'Bếp gas'}
          />
        </View>

        <Image
          className='w-full h-[60px]'
          source={require('../assets/sale8-3.jpg')}
        />

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Bếp điện'} />

          <FlatList
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 4,
              marginTop: 20,
            }}
            renderItem={({ item }) => (
              <ProductCard userId={userId} item={item} size={0.45} />
            )}
            keyExtractor={(item) => item?._id}
            data={bepDien?.slice(0, 6)}
            showsHorizontalScrollIndicator={false}
            horizontal
          />

          <SeeMoreCard
            userId={userId}
            categoryId={'6667cd3d026b92076ff622a5'}
            extraText={'Bếp điện'}
          />
        </View>

        <Image
          className='w-full h-[140px]'
          source={require('../assets/DonTetSaleHet_MayLocNuoc.png')}
        />

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Gia dụng'} />

          <FlatList
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 4,
              marginTop: 20,
            }}
            renderItem={({ item }) => (
              <ProductCard userId={userId} item={item} size={0.45} />
            )}
            keyExtractor={(item) => item?._id}
            data={giaDung?.slice(0, 6)}
            showsHorizontalScrollIndicator={false}
            horizontal
          />

          <SeeMoreCard
            userId={userId}
            categoryId={'6667cd99026b92076ff622a7'}
            extraText={'Gia dụng'}
          />
        </View>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Phụ kiện'} />

          <FlatList
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 4,
              marginTop: 20,
            }}
            renderItem={({ item }) => (
              <ProductCard userId={userId} item={item} size={0.45} />
            )}
            keyExtractor={(item) => item?._id}
            data={phuKien?.slice(0, 6)}
            showsHorizontalScrollIndicator={false}
            horizontal
          />

          <SeeMoreCard
            userId={userId}
            categoryId={'6667cdc6026b92076ff622ab'}
            extraText={'Phụ kiện'}
          />
        </View>

        <View className='border-t-2 border-primary-pink my-2 bg-white'>
          <View className='px-3 pt-2'>
            <Text className='font-semibold text-primary-pink text-[16px]'>
              Thương hiệu
            </Text>
          </View>
          <HorizontalBrand userId={userId} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HorizontalCategory = ({ userId }) => {
  const [catList, setCatList] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${EXPO_PUBLIC_API}/category`);

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
    <FlatList
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate('ProductByCategory', {
              categoryId: item?._id,
              userId: userId,
            })
          }
          className='m-1'
        >
          <Image
            resizeMode='contain'
            className='w-20 h-20'
            source={{ uri: item?.image }}
          />
          <Text className='text-center font-medium'>{item?.name}</Text>
        </Pressable>
      )}
      showsHorizontalScrollIndicator={false}
      data={catList}
      keyExtractor={(item) => item?._id}
      horizontal
      style={{ backgroundColor: 'white' }}
    />
  );
};

const HorizontalBrand = ({ userId }) => {
  const [brandList, setBrandList] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await axios.get(`${EXPO_PUBLIC_API}/brand`);
        if (res.status === 200) {
          setBrandList(res?.data.brand.reverse());
          console.log('Fetch brand thành công!');
          setLoading(false);
        } else {
          console.log('Fetch brand không thành công (HomeScreen)');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log('Fetch brand không thành công (HomeScreen)');
      }
    };

    fetchBrand();
  }, []);

  if (loading) {
    return (
      <View className='h-[84px] flex justify-center'>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate('ProductByBrand', {
              brandId: item?._id,
              userId: userId,
            })
          }
          className='m-1'
        >
          <Image
            resizeMode='contain'
            className='w-20 h-20'
            source={{ uri: item?.image }}
          />
          <Text className='text-center font-medium'>{item?.name}</Text>
        </Pressable>
      )}
      showsHorizontalScrollIndicator={false}
      data={brandList}
      keyExtractor={(item) => item?._id}
      horizontal
    />
  );
};

export default HomeScreen;
