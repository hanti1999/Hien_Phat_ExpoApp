import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const ProductTitle = ({ text }) => {
  return (
    <Pressable onPress={() => Alert.alert('Thông báo', 'Clicked')}>
      <View
        className='absolute -top-5 left-1/2 z-1 w-[200px]'
        style={{ transform: [{ translateX: -100 }] }}
      >
        <View className='absolute border-x-[12px] border-b-[20px] border-x-transparent border-b-pink-500 -right-3 top-0' />
        <View className='absolute border-x-[12px] border-b-[20px] border-x-transparent border-b-pink-500 -left-3 top-0' />
        <View className='bg-primary-pink relative flex w-full items-center justify-center rounded-b-lg py-1'>
          <Text className='font-semibold text-xl text-white uppercase'>
            {text}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductTitle;

const styles = StyleSheet.create({});
