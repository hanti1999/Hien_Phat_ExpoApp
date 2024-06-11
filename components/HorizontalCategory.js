import {
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const HorizontalCategory = () => {
  const [catList, setCatList] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/category`);

        if (res.status === 200) {
          const cat = res.data.category;
          setCatList(cat);
          setLoading(false);
        } else {
          setLoading(false);
          console.log('Lỗi, fetch category không thành công');
        }
      } catch (error) {
        setLoading(false);
        console.log('Lỗi Horizontal category', error);
      }
    };

    fetchCategory();
  }, []);

  if (loading) {
    return (
      <View className='h-[84px] flex justify-center'>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {catList?.map((item, index) => (
        <Pressable
          onPress={() =>
            navigation.navigate('ProductByCategory', {
              categoryId: item._id,
            })
          }
          key={index}
          className='m-1'
        >
          <Image
            resizeMode='contain'
            className='w-20 h-20'
            source={{ uri: item?.image }}
          />
          <Text className='text-center font-medium'>{item?.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default HorizontalCategory;
