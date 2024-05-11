import { Text, ScrollView, Pressable, Image, Alert } from 'react-native';
import React from 'react';

const list = [
  {
    id: 0,
    image: require('../assets/category-icon/bepGas.png'),
    name: 'Bếp gas',
  },
  {
    id: 1,
    image: require('../assets/category-icon/bepDien.png'),
    name: 'Bếp điện',
  },
  {
    id: 2,
    image: require('../assets/category-icon/giaDung.png'),
    name: 'Gia dụng',
  },
  {
    id: 3,
    image: require('../assets/category-icon/gaost.png'),
    name: 'Gạo',
  },
  {
    id: 4,
    image: require('../assets/category-icon/phuKien.png'),
    name: 'Phụ kiện',
  },
  {
    id: 5,
    image: require('../assets/category-icon/nuoc.png'),
    name: 'Nước',
  },
];

const HorizontalCategory = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {list.map((item, index) => (
        <Pressable
          onPress={() => Alert.alert('Thông báo', 'Clicked')}
          key={index}
          className='m-1'
        >
          <Image
            resizeMode='contain'
            className='w-20 h-20'
            source={item?.image}
          />
          <Text className='text-center font-medium'>{item?.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default HorizontalCategory;
