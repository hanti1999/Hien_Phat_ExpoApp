import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import React from 'react';

const ScreenHeader = ({ text }) => {
  const navigation = useNavigation();
  return (
    <View className='flex flex-row items-center bg-white border-b border-gray-300'>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name='chevron-thin-left' size={24} style={{ padding: 10 }} />
      </Pressable>
      <Text className='font-bold text-[20px]'>{text}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({});
