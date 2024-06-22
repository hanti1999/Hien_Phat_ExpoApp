import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
  Dimensions,
  StatusBar,
  Alert,
  Linking,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '@env';
import moment from 'moment';
import axios from 'axios';
import { addToCart } from '../redux/slices/CartReducer';
import ScreenHeader from '../components/ScreenHeader';

const ProductInfoScreen = ({ route, navigation }) => {
  const { item, userId } = route?.params;
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [inWishlist, setIsInWishlist] = useState();
  const [loading, setLoading] = useState(false);

  const checkWishlist = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/wishlist/check/${item?._id}/${userId}`
      );
      if (res.status === 200) {
        const result = res.data.isProductInWishlist;
        setIsInWishlist(result);
        console.log('Check wishlist thành công!');
      } else {
        console.log('Lỗi check wishlist');
      }
    } catch (error) {
      console.log('Lỗi check wishlist', error);
    }
  };

  useEffect(() => {
    checkWishlist();
  }, []);

  const addItemToCart = (item) => {
    dispatch(
      addToCart({
        id: item?._id,
        title: item?.title,
        productImg: item?.image,
        price: item?.price,
      })
    );
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const navigateToReview = () => {
    navigation.navigate('Review', { productId: item._id, userId: userId });
  };

  const addWishlist = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/wishlist/add/${item?._id}/${userId}`
      );
      if (res.status === 200) {
        console.log(res.data.message);
        setLoading(false);
        checkWishlist();
      } else {
        setLoading(false);
        console.log('Lỗi không thêm được wishlist');
      }
    } catch (error) {
      setLoading(false);
      console.log('Lỗi không thêm được wishlist', error);
    }
  };

  const removeWishlist = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${BASE_URL}/wishlist/delete/${item?._id}/${userId}`
      );
      if (res.status === 200) {
        console.log(res.data.message);
        checkWishlist();
        setLoading(false);
      } else {
        setLoading(false);
        console.log('Lỗi không xóa được wishlist');
      }
    } catch (error) {
      setLoading(false);
      console.log('Lỗi không xóa được wishlist', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == 'android' ? 0 : 0,
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        className='bg-gray-100'
      >
        <StatusBar />
        <ScreenHeader text={'Chi tiết sản phẩm'} />

        <SliderBox
          images={item?.carouselImages}
          dotColor='#302671'
          inactiveDotColor='#333'
          ImageComponentStyle={width}
          sliderBoxHeight={width}
        />

        <View className='py-2 px-3 mb-2 bg-pink-100'>
          <Text numberOfLines={2} className='font-semibold text-[18px]'>
            {item?.title}
          </Text>
          <View className='flex-row items-center py-2' style={{ gap: 8 }}>
            <Text className='text-[24px] font-bold'>
              {item?.price.toLocaleString()}đ
            </Text>

            <Text className='line-through text-[16px] text-gray-500'>
              {item?.oldPrice.toLocaleString()}đ
            </Text>

            <View className='px-1 py-0.5 rounded-lg bg-red-500'>
              <Text className='text-white '>
                -{100 - Math.round((item?.price * 100) / item?.oldPrice)}%
              </Text>
            </View>
          </View>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row items-center' style={{ gap: 4 }}>
              <Text>5</Text>
              <FontAwesome name='star' size={14} color='#faa935' />
              <Text>({item?.reviews.length} đánh giá)</Text>
              <Text className='text-gray-400'>|</Text>
              <Text>Đã bán: {item?.sold}</Text>
            </View>
            {inWishlist ? (
              <Pressable onPress={removeWishlist} disabled={loading}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <FontAwesome name='heart' size={24} color='#fb77c5' />
                )}
              </Pressable>
            ) : (
              <Pressable onPress={addWishlist} disabled={loading}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <FontAwesome name='heart-o' size={24} color='#fb77c5' />
                )}
              </Pressable>
            )}
          </View>
        </View>

        <View className='py-2 px-3 mb-2 bg-pink-200'>
          <Text className='text-[16px] font-semibold mb-2'>
            Đặc điểm nổi bật
          </Text>
          <View>
            {item?.features?.map((item, index) => (
              <Text className='pt-0.5' key={index}>
                o {item}
              </Text>
            ))}
          </View>
        </View>

        <View className='py-2 px-3 mb-2 bg-pink-300'>
          <Text className='text-[16px] font-semibold mb-2'>Bài đánh giá</Text>
          <Reviews reviews={item?.reviews} />
          <Pressable
            onPress={navigateToReview}
            className='bg-white w-[200px] rounded-full p-2 mt-2'
          >
            <Text className='text-[16px] text-center'>
              Viết đánh giá của bạn
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <View className='flex-row justify-evenly bg-white py-4'>
        <OpenURLButton url='https://zalo.me/0986359498'>
          <Text className='text-[#0068ff] text-[18px]'>
            Tư vấn
            <Text className='font-bold'> Zalo</Text>
          </Text>
        </OpenURLButton>
        <Pressable
          onPress={() => addItemToCart(item)}
          className='bg-primary-pink rounded-lg flex-1 mx-2 items-center h-[60px] justify-center'
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text className='text-white text-[18px] '>Mua ngay</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const OpenURLButton = ({ url, children }) => {
  const handlePress = async () => {
    const canOpenURL = await Linking.canOpenURL(url);

    if (canOpenURL) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Không thể mở URL: ${url}`);
    }
  };

  return (
    <Pressable
      className='border-[#0068ff] border-2 rounded-lg flex-1 mx-2 h-[60px] items-center justify-center'
      onPress={() => handlePress()}
    >
      {children}
    </Pressable>
  );
};

const Reviews = ({ reviews }) => {
  if (reviews.length === 0) {
    return <Text>Chưa có đánh giá!</Text>;
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item._id}
      initialNumToRender={6}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className='mr-2 bg-white rounded-lg p-2 w-[360px]'>
          <View className='flex-row items-center' style={{ gap: 4 }}>
            <Text className='text-[#faa935] font-semibold'>{item?.rating}</Text>
            <FontAwesome name='star' size={16} color='#faa935' />
          </View>
          <Text className='font-semibold mb-1'>{item?.name}</Text>
          <Text>{item?.comment}</Text>
          <View className='flex-row'>
            <Text className='text-[#faa935] font-medium'>
              Sản phẩm: {item?.productRating}
              <FontAwesome name='star' size={16} color='#faa935' />
            </Text>
            <Text className='text-[#faa935]'> | </Text>
            <Text className='text-[#faa935] font-medium'>
              Dịch vụ: {item?.serviceRating}
              <FontAwesome name='star' size={16} color='#faa935' />
            </Text>
          </View>
          <Text className='italic text-gray-500'>
            {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
      )}
    />
  );
};

export default ProductInfoScreen;
