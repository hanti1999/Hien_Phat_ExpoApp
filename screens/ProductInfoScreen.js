import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  Linking,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Carousel } from 'react-native-basic-carousel';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { EXPO_PUBLIC_API } from '@env';
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
  // Giá sau khuyến mãi
  const actualPrice = item?.price * (1 - item.discount / 100); //
  // Điểm đánh giá trung bình
  const totalRating = item?.reviews.reduce((acc, item) => acc + item.rating, 0);
  const averageRating = totalRating / item?.reviews.length; //

  const checkWishlist = async () => {
    try {
      const url = `${EXPO_PUBLIC_API}/wishlist/check/${item?._id}/${userId}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        const result = res.data.isProductInWishlist;
        setIsInWishlist(result);
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

  const addItemToCart = () => {
    dispatch(
      addToCart({
        id: item?._id,
        title: item?.title,
        productImg: item?.image,
        price: item?.price,
      })
    );
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      Toast.show({ text1: 'Đã thêm sản phẩm vào giỏ hàng' });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  };

  const navigateToReview = () => {
    navigation.navigate('Review', { productId: item._id, userId: userId });
  };

  const addWishlist = async () => {
    try {
      setLoading(true);
      const url = `${EXPO_PUBLIC_API}/wishlist/add/${item?._id}/${userId}`;
      const res = await axios.post(url);
      if (res.status === 200) {
        Toast.show({ text1: 'Đã thêm vào sản phẩm yêu thích' });
        checkWishlist();
      } else {
        Toast.show({ type: 'error', text1: 'Thêm không thành công' });
      }
    } catch (error) {
      console.log('Lỗi không thêm được wishlist', error);
      Toast.show({ type: 'error', text1: 'Thêm không thành công' });
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async () => {
    try {
      setLoading(true);
      const url = `${EXPO_PUBLIC_API}/wishlist/delete/${item?._id}/${userId}`;
      const res = await axios.delete(url);
      if (res.status === 200) {
        checkWishlist();
        Toast.show({ text1: 'Đã xóa khỏi sản phẩm yêu thích' });
      } else {
        Toast.show({ type: 'error', text1: 'Xoá không thành công' });
      }
    } catch (error) {
      console.log('Lỗi không xóa được wishlist', error);
      Toast.show({ type: 'error', text1: 'Xoá không thành công' });
    } finally {
      setLoading(false);
    }
  };

  const openZalo582 = async () => {
    const canOpenURL = await Linking.canOpenURL('https://zalo.me/0975841582');

    if (canOpenURL) {
      await Linking.openURL('https://zalo.me/0975841582');
    } else {
      Alert.alert(`Không thể mở URL`);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        className='bg-gray-100'
      >
        <ScreenHeader text={'Chi tiết sản phẩm'} />
        <Carousel
          data={item?.carouselImages}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              source={{ uri: item }}
              style={{ height: width }}
            />
          )}
          itemWidth={width}
          pagination={true}
          paginationType='circle'
          paginationColor='#302671'
        />

        <View className='py-2 px-3 mb-2 bg-pink-100'>
          <Text numberOfLines={2} className='font-semibold text-[18px]'>
            {item?.title}
          </Text>
          <View className='flex-row items-center py-2' style={{ gap: 8 }}>
            <Text className='text-[24px] font-bold'>
              {actualPrice.toLocaleString()}đ
            </Text>
            {item?.discount > 0 && (
              <>
                <Text className='line-through text-[16px] text-gray-500'>
                  {item?.price.toLocaleString()}đ
                </Text>
                <View className='px-1 py-0.5 rounded-lg bg-red-500'>
                  <Text className='text-white '>-{item?.discount}%</Text>
                </View>
              </>
            )}
          </View>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row items-center' style={{ gap: 4 }}>
              <Text>{averageRating}</Text>
              <FontAwesome name='star' size={14} color='#faa935' />
              <Text>({item?.reviews.length} đánh giá)</Text>
              <Text className='text-gray-400'>|</Text>
              <Text>Đã bán: {item?.sold}</Text>
            </View>
            {inWishlist ? (
              <TouchableOpacity onPress={removeWishlist} disabled={loading}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <FontAwesome name='heart' size={24} color='#fb77c5' />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={addWishlist} disabled={loading}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <FontAwesome name='heart-o' size={24} color='#fb77c5' />
                )}
              </TouchableOpacity>
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
          <TouchableOpacity
            onPress={navigateToReview}
            className='bg-white w-[200px] rounded-full p-2 mt-2'
          >
            <Text className='text-[16px] text-center'>
              Viết đánh giá của bạn
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className='flex-row justify-evenly bg-white py-4'>
        <TouchableOpacity
          className='border-[#0068ff] border-2 rounded-lg flex-1 mx-2 h-[60px] items-center justify-center'
          onPress={openZalo582}
        >
          <Text className='text-[#0068ff] text-[18px]'>
            Tư vấn
            <Text className='font-bold'> Zalo</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addItemToCart}
          className='bg-primary-pink rounded-lg flex-1 mx-2 items-center h-[60px] justify-center'
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text className='text-white text-[18px] '>Mua ngay</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
