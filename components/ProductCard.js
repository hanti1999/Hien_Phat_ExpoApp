import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';

const ProductCard = ({ item }) => {
  return (
    <Pressable
      onPress={() => Alert.alert('Thông báo', 'Clicked')}
      className='w-[180px] max-h-[320px] pr-2 mb-2'
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
            onPress={() => Alert.alert('Thông báo', 'Clicked')}
            className=' bg-primary-pink'
          >
            <Text className='text-center py-2 text-white text-lg uppercase'>
              mua
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
