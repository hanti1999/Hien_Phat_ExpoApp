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
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { addToCart } from '../redux/slices/CartReducer';

const ProductInfoScreen = ({ route, navigation }) => {
  const { price, oldPrice, carouselImages, title, features, item } =
    route?.params;
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <SafeAreaView
      className='flex-1 bg-white'
      style={{ paddingTop: Platform.OS == 'android' ? 0 : 0 }}
    >
      <ScrollView stickyHeaderIndices={[1]} className='bg-gray-100'>
        <StatusBar />
        <Navigation navigation={navigation} />

        <FlatList
          data={carouselImages}
          horizontal
          renderItem={renderImage}
          decelerationRate={0.8}
          snapToInterval={width}
        />

        <View className='p-2.5 bg-pink-100'>
          <Text numberOfLines={2} className='font-semibold text-lg'>
            {title}
          </Text>
          <View className='flex-row items-center py-3'>
            <View className='p-0.5 rounded bg-red-500 mr-1'>
              <Text className='text-white '>
                -{100 - Math.round((price * 100) / oldPrice)}%
              </Text>
            </View>
            <Text className='line-through text-base'>
              {oldPrice.toLocaleString()}đ
            </Text>
          </View>
          <Text className='text-2xl font-bold'>{price.toLocaleString()}đ</Text>
        </View>

        <View className='p-2.5 mt-2.5 bg-purple-100'>
          <Text className='text-base font-semibold mb-2'>Đặc điểm nổi bật</Text>
          <View>
            {features?.map((item, index) => (
              <Text className='pt-0.5' key={index}>
                o {item}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className='flex-row justify-evenly bg-white py-4'>
        <OpenURLButton url='https://zalo.me/0986359498'>
          <Text className='text-[#0068ff] text-lg'>
            Tư vấn
            <Text className='font-bold'> Zalo</Text>
          </Text>
        </OpenURLButton>
        <Pressable
          onPress={() => addItemToCart(item)}
          className='bg-primary-blue rounded-lg flex-1 mx-2 items-center h-16 justify-center'
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text className='text-white text-lg '>Mua ngay</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const Navigation = ({ navigation }) => {
  return (
    <View className=' flex-row justify-between items-center bg-white'>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name='chevron-left' size={32} style={{ padding: 10 }} />
      </Pressable>
      <Pressable onPress={() => Alert.alert('nav to Cart')}>
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

const OpenURLButton = ({ url, children }) => {
  const handlePress = async () => {
    const canOpenURL = await Linking.canOpenURL(url);

    if (canOpenURL) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Không thể mở URL: ${url}`);
    }
  };

  return (
    <Pressable
      className='border-[#0068ff] border-2 rounded-lg flex-1 mx-2 h-16 items-center justify-center'
      onPress={() => handlePress()}
    >
      {children}
    </Pressable>
  );
};

export default ProductInfoScreen;
