import { Text, View, Pressable, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { addToCart, clearCart } from '../redux/slices/CartReducer';

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const addItemToCart = (item) => {
    dispatch(
      addToCart({
        id: item?.id,
        title: item?.title,
        productImg: item?.image,
        price: item?.price,
      })
      // clearCart()
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
          id: item?.id,
          title: item?.title,
          oldPrice: item?.oldPrice,
          price: item?.price,
          carouselImages: item?.carouselImages,
          features: item?.features,
          item: item,
        })
      }
      className='w-[180px] max-h-[320px] pr-2 mb-2'
      disabled={isLoading}
    >
      <View className='border h-full flex justify-between border-gray-200 rounded-md overflow-hidden'>
        <View>
          <Image
            resizeMode='contain'
            className='w-full h-[180px]'
            source={item?.image}
          />
          <View className='mx-2'>
            <Text numberOfLines={2}>{item?.title}</Text>
            <Text className='line-through'>
              {item?.oldPrice.toLocaleString()}
            </Text>
            <Text className='font-semibold text-red-500 text-lg'>
              {item?.price.toLocaleString()}đ
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
              <Text className=' text-white text-lg font-medium uppercase'>
                mua
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;
