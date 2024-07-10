import {
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { addToCart } from '../redux/slices/CartReducer';

const ProductCard = ({ item, userId, size }) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const actualPrice = item?.price * (1 - item.discount / 100);
  const width = Dimensions.get('window').width;

  const addItemToCart = (item) => {
    dispatch(
      addToCart({
        id: item?._id,
        title: item?.title,
        productImg: item?.image,
        price: actualPrice,
      })
    );
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      Toast.show({ type: 'success', text1: 'Đã thêm sản phẩm vào giỏ hàng' });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  };

  const navToInfo = () => {
    navigation.navigate('Info', { item, userId });
  };

  return (
    <Pressable
      onPress={navToInfo}
      className='max-h-[340px] mx-1 my-1'
      disabled={isLoading}
      style={{ width: width * size - 8 }}
    >
      <View className='border h-full flex justify-between border-gray-200 bg-pink-100 rounded-md overflow-hidden'>
        <View>
          <Image className='w-full h-[180px]' source={{ uri: item?.image }} />
          <View className='p-1.5 h-[100px] justify-between'>
            <Text numberOfLines={2}>{item?.title}</Text>
            {item?.discount > 0 && (
              <View className='flex-row items-center' style={{ gap: 4 }}>
                <View className='px-1 py-0.5 rounded bg-red-500'>
                  <Text className='text-white '>-{item?.discount}%</Text>
                </View>
                <Text className='line-through text-gray-500'>
                  {item?.price?.toLocaleString()}
                </Text>
              </View>
            )}
            <View className='flex-row justify-between items-center'>
              <Text className='font-semibold text-red-500 text-[18px]'>
                {actualPrice?.toLocaleString()}đ
              </Text>
              <Text className='text-gray-500 text-[12px]'>
                Đã bán: {item?.sold}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Pressable
            onPress={() => addItemToCart(item)}
            className=' bg-primary-pink h-[48px] flex items-center justify-center'
          >
            {isLoading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <Text className=' text-white text-[16px] font-medium uppercase'>
                sắm ngay nào!
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;
