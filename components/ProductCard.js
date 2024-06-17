import { Text, View, Pressable, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { addToCart } from '../redux/slices/CartReducer';

const ProductCard = ({ item }) => {
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

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Info', {
          id: item?._id,
          title: item?.title,
          oldPrice: item?.oldPrice,
          price: item?.price,
          carouselImages: item?.carouselImages,
          features: item?.features,
          item: item,
        })
      }
      className='w-[180px] max-h-[320px] mx-1 my-2'
      disabled={isLoading}
    >
      <View className='border h-full flex justify-between border-gray-200 bg-pink-100 rounded-md overflow-hidden'>
        <View>
          <Image className='w-full h-[180px]' source={{ uri: item?.image }} />
          <View className='px-2 pt-1'>
            <Text numberOfLines={2}>{item?.title}</Text>
            <View className='flex-row items-center my-0.5'>
              <View className='p-0.5 rounded bg-red-500 mr-1'>
                <Text className='text-white '>
                  -{100 - Math.round((item?.price * 100) / item?.oldPrice)}%
                </Text>
              </View>
              <Text className='line-through'>
                {item?.oldPrice?.toLocaleString()}
              </Text>
            </View>
            <Text className='font-semibold text-red-500 text-[18px]'>
              {item?.price?.toLocaleString()}đ
            </Text>
          </View>
        </View>

        <View>
          <Pressable
            onPress={() => addItemToCart(item)}
            className=' bg-primary-pink h-12 flex items-center justify-center'
          >
            {isLoading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <Text className=' text-white text-base font-medium uppercase'>
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
