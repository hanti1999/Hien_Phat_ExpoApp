import { TextInput, View, Pressable, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';

const SearchBar = () => {
  const navigation = useNavigation();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [input, setInput] = useState('');

  const searchHandler = () => {
    navigation.navigate('SearchResult', { input: input });
  };

  return (
    <View className='bg-primary-pink flex-row items-center'>
      <View
        style={{ gap: 10 }}
        className='px-2.5 flex-row flex-1 items-center bg-white h-10 rounded-md ml-4 my-2.5'
      >
        <Pressable onPress={searchHandler}>
          <Ionicons name='search' size={24} />
        </Pressable>
        <TextInput
          className='text-base flex-1'
          placeholder='Khách iu tìm gì nè?'
          value={input}
          onChangeText={setInput}
          onSubmitEditing={searchHandler}
        />
        <Pressable onPress={searchHandler}>
          <Image
            className='w-10 h-10'
            source={require('../assets/tulip.png')}
          />
        </Pressable>
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
