import { TextInput, View, Pressable, Alert, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import React from 'react';

const SearchBar = () => {
  const navigation = useNavigation();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <View className='bg-primary-pink flex-row items-center'>
      <View
        style={{ gap: 10 }}
        className='px-2.5 flex-row flex-1 items-center bg-white h-10 rounded-md ml-4 my-2.5'
      >
        <Ionicons name='search' size={24} />
        <TextInput
          className='text-base flex-1'
          placeholder='Khách iu tìm gì nè? '
        />
        <Image className='w-10 h-10' source={require('../assets/tulip.png')} />
      </View>
      <Pressable
        className='relative px-2.5'
        onPress={() => navigation.navigate('Cart')}
      >
        <Ionicons name='cart-outline' size={30} />
        <View className='absolute w-5 h-5 bg-white rounded-full right-1 -top-2'>
          <Text className='text-center text-primary-pink h-full leading-5'>
            {cartQuantity}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SearchBar;
