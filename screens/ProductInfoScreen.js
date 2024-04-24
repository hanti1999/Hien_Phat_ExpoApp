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
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import React from 'react';

const ProductInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS == 'android' ? 20 : 0 }}>
      <StatusBar />
      <ScrollView stickyHeaderIndices={[0]} className='bg-gray-100'>
        <View className=' flex-row justify-between items-center bg-gray-100'>
          <Pressable onPress={() => navigation.goBack()}>
            <Entypo name='chevron-left' size={30} style={{ padding: 10 }} />
          </Pressable>
          <Pressable>
            <AntDesign name='shoppingcart' size={30} style={{ padding: 10 }} />
          </Pressable>
        </View>

        <View>
          <FlatList
            data={route?.params?.carouselImages}
            horizontal
            renderItem={renderImage}
            decelerationRate={0.8}
            snapToInterval={width}
          />
        </View>

        <View className='p-2.5'>
          <Text numberOfLines={2} className='font-semibold text-base'>
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
      </ScrollView>

      <View className='flex-row justify-evenly bg-white py-4 shadow'>
        <Pressable
          onPress={() => Alert.alert('clicked')}
          className='border-primary-blue border rounded-lg flex-1 mx-2 py-4 items-center'
        >
          <Text className='text-primary-blue text-lg '>Tư vấn ngay</Text>
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
        className='w-full h-full'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProductInfoScreen;
