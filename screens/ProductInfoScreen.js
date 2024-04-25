import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
  FlatList,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import React from 'react';

const ProductInfoScreen = () => {
  const route = useRoute();
  const width = Dimensions.get('window').width;
  return (
    <SafeAreaView
      className='flex-1 bg-white'
      style={{ paddingTop: Platform.OS == 'android' ? 20 : 0 }}
    >
      <ScrollView stickyHeaderIndices={[1]} className='bg-gray-100'>
        <StatusBar />
        <Navigation />

        <FlatList
          data={route?.params?.carouselImages}
          horizontal
          renderItem={renderImage}
          decelerationRate={0.8}
          snapToInterval={width}
        />

        <View className='p-2.5 bg-pink-100'>
          <Text numberOfLines={2} className='font-semibold text-lg'>
            {route?.params?.title}
          </Text>
          <View className='flex-row items-center py-3'>
            <View className='p-0.5 rounded bg-red-500 mr-1'>
              <Text className='text-white '>
                -
                {Math.round(
                  (route?.params?.price * 100) / route?.params?.oldPrice
                )}
                %
              </Text>
            </View>
            <Text className='line-through text-base'>
              {route?.params?.oldPrice.toLocaleString()}đ
            </Text>
          </View>
          <Text className='text-2xl font-bold'>
            {route?.params?.price.toLocaleString()}đ
          </Text>
        </View>

        <View className='p-2.5 mt-2.5 bg-purple-100'>
          <Text className='text-base font-semibold mb-2'>Đặc điểm nổi bật</Text>
          <View>
            {route?.params?.features?.map((item, index) => (
              <Text className='pt-0.5' key={index}>
                o {item}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className='flex-row justify-evenly bg-white py-4'>
        <Pressable
          onPress={() => Alert.alert('clicked')}
          className='border-primary-blue border rounded-lg flex-1 mx-2 py-4 items-center'
        >
          <Text className='text-primary-blue text-lg '>Tư vấn Zalo</Text>
        </Pressable>
        <Pressable
          onPress={() => Alert.alert('clicked')}
          className='bg-primary-blue rounded-lg flex-1 mx-2 py-4 items-center'
        >
          <Text className='text-white text-lg '>Mua ngay</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const Navigation = () => {
  const navigation = useNavigation();
  return (
    <View className=' flex-row justify-between items-center bg-white'>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name='chevron-left' size={32} style={{ padding: 10 }} />
      </Pressable>
      <Pressable>
        <AntDesign name='shoppingcart' size={32} style={{ padding: 10 }} />
      </Pressable>
    </View>
  );
};

const renderImage = ({ item }) => {
  const width = Dimensions.get('window').width;
  return (
    <View
      className='justify-center items-center'
      style={{ height: width, width: width }}
    >
      <Image
        source={item}
        style={{ resizeMode: 'contain' }}
        className='w-full h-full '
      />
    </View>
  );
};

export default ProductInfoScreen;
