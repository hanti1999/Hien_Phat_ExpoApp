import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import ScreenHeader from './ScreenHeader';

const NoProduct = ({ text }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScreenHeader />
      <View className='flex items-center h-full bg-gray-100 px-2'>
        <Image
          style={{ maxWidth: 400, maxHeight: 400 }}
          source={require('../assets/cart.png')}
        />
        <Text className='text-[#ff725e] text-xs'>
          Image by storyset on Freepik
        </Text>

        <Text className='font-semibold text-lg my-10'>{text}</Text>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          className='py-3 w-full bg-primary-pink rounded-xl'
        >
          <Text className='text-white text-lg text-center'>
            Tiếp tục mua hàng
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default NoProduct;

const styles = StyleSheet.create({});
