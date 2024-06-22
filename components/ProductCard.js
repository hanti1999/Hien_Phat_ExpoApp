import { Text, View, Pressable, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { addToCart } from '../redux/slices/CartReducer';

const ProductCard = ({ item, userId }) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(
      addToCart({
        id: item?._id,
        title: item?.title,
        productImg: item?.image,
        price: item?.price,
      })
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const navToInfo = () => {
    navigation.navigate('Info', { item, userId });
  };

  return (
    <Pressable
      onPress={navToInfo}
      className='w-[180px] max-h-[320px] mx-1 my-2'
      disabled={isLoading}
    >
      <View className='border h-full flex justify-between border-gray-200 bg-pink-100 rounded-md overflow-hidden'>
        <View>
          <Image className='w-full h-[160px]' source={{ uri: item?.image }} />
          <View className='p-1.5 h-[100px] justify-between'>
            <Text numberOfLines={2}>{item?.title}</Text>
            <View className='flex-row items-center' style={{ gap: 4 }}>
              <View className='px-1 py-0.5 rounded bg-red-500'>
                <Text className='text-white '>
                  -{100 - Math.round((item?.price * 100) / item?.oldPrice)}%
                </Text>
              </View>
              <Text className='line-through text-gray-500'>
                {item?.oldPrice?.toLocaleString()}
              </Text>
            </View>
            <View className='flex-row justify-between items-center'>
              <Text className='font-semibold text-red-500 text-[18px]'>
                {item?.price?.toLocaleString()}đ
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
