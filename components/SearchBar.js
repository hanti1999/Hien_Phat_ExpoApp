import { TextInput, View, Pressable, Alert, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import React from 'react';

const SearchBar = () => {
  const navigation = useNavigation();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <View className='bg-primary-pink flex-row items-center'>
      <Pressable
        onPress={() => Alert.alert('Thông báo', 'Clicked')}
        className='flex-row flex-1 items-center bg-white h-10 rounded-md ml-4 my-2.5'
      >
        <Ionicons style={{ paddingHorizontal: 10 }} name='search' size={24} />
        <TextInput className='text-base flex-1' placeholder='Bạn cần tìm gì?' />
      </Pressable>
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
