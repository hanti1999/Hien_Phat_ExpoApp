import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useSelector } from 'react-redux';

const ScreenHeader = ({ text }) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigation = useNavigation();

  return (
    <View className='flex-row justify-between items-center bg-white border-b border-gray-300'>
      <View className='flex-row items-center'>
        <Pressable onPress={() => navigation.goBack()}>
          <Entypo name='chevron-thin-left' size={24} style={{ padding: 10 }} />
        </Pressable>
        <Text className='font-bold text-[20px]'>{text}</Text>
      </View>
      <Pressable
        className='relative'
        onPress={() => navigation.navigate('Cart')}
      >
        <Ionicons name='cart-outline' size={32} style={{ padding: 10 }} />
        <View className='absolute w-5 h-5 bg-primary-pink rounded-full right-1 top-1'>
          <Text className='text-center text-white h-full leading-5'>
            {cartQuantity}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({});
