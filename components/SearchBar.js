import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const SearchBar = () => {
  return (
    <View className='bg-primary-pink'>
      <Pressable
        onPress={() => Alert.alert('Thông báo', 'Clicked')}
        className='flex-row items-center bg-white h-10 rounded-md mx-4 my-2.5'
      >
        <Ionicons
          style={{ paddingHorizontal: 10 }}
          name='search'
          size={24}
          color='gray'
        />
        <TextInput className='text-base flex-1' placeholder='Bạn cần tìm gì?' />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
