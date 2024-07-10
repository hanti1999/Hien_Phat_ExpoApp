import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import React from 'react';

const SeeMoreCard = ({ categoryId, userId }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ProductByCategory', { categoryId, userId })
      }
      className='h-[340px] w-[180px]'
    >
      <View className='w-full h-full justify-center items-center'>
        <Text className='text-blue-400'>Xem Thêm</Text>
        <View className=' bg-gray-100 w-10 h-10 rounded-full justify-center mt-2 items-center'>
          <Entypo name='chevron-right' size={24} color='#60a5fa' />
        </View>
      </View>
    </Pressable>
  );
};

export default SeeMoreCard;
