import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
  Dimensions,
  StatusBar,
  Alert,
  Linking,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import moment from 'moment';
import { addToCart } from '../redux/slices/CartReducer';
import ScreenHeader from '../components/ScreenHeader';

const ProductInfoScreen = ({ route }) => {
  const { item } = route?.params;
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const addItemToCart = (item) => {
    dispatch(
      addToCart({
        id: item?._id,
        title: item?.title,
        productImg: item?.image,
        price: item?.price,
      })
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == 'android' ? 0 : 0,
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <ScrollView stickyHeaderIndices={[1]} className='bg-gray-100'>
        <StatusBar />
        <ScreenHeader text={'Chi tiết sản phẩm'} />

        <SliderBox
          images={item?.carouselImages}
          dotColor='#302671'
          inactiveDotColor='#333'
          ImageComponentStyle={width}
          sliderBoxHeight={width}
        />

        <View className='p-2 mb-2 bg-pink-100'>
          <Text numberOfLines={2} className='font-semibold text-[18px]'>
            {item?.title}
          </Text>
          <View className='flex-row items-center py-3'>
            <View className='p-0.5 rounded bg-red-500 mr-1'>
              <Text className='text-white '>
                -{100 - Math.round((item?.price * 100) / item?.oldPrice)}%
              </Text>
            </View>
            <Text className='line-through text-[16px]'>
              {item?.oldPrice.toLocaleString()}đ
            </Text>
          </View>
          <Text className='text-2xl font-bold'>
            {item?.price.toLocaleString()}đ
          </Text>
        </View>

        <View className='p-2 mb-2 bg-pink-200'>
          <Text className='text-[16px] font-semibold mb-2'>
            Đặc điểm nổi bật
          </Text>
          <View>
            {item?.features?.map((item, index) => (
              <Text className='pt-0.5' key={index}>
                o {item}
              </Text>
            ))}
          </View>
        </View>

        <View className='p-2 mb-2 bg-pink-300'>
          <Text className='text-[16px] font-semibold mb-2'>Đánh giá</Text>
          <Reviews reviews={item?.reviews} />
        </View>
      </ScrollView>

      <View className='flex-row justify-evenly bg-white py-4'>
        <OpenURLButton url='https://zalo.me/0986359498'>
          <Text className='text-[#0068ff] text-[18px]'>
            Tư vấn
            <Text className='font-bold'> Zalo</Text>
          </Text>
        </OpenURLButton>
        <Pressable
          onPress={() => addItemToCart(item)}
          className='bg-primary-pink rounded-lg flex-1 mx-2 items-center h-[60px] justify-center'
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text className='text-white text-[18px] '>Mua ngay</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
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
      className='border-[#0068ff] border-2 rounded-lg flex-1 mx-2 h-[60px] items-center justify-center'
      onPress={() => handlePress()}
    >
      {children}
    </Pressable>
  );
};

const Reviews = ({ reviews }) => {
  if (reviews.length === 0) {
    return <Text>Chưa có đánh giá!</Text>;
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item._id}
      initialNumToRender={6}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className='mr-2 bg-white rounded-lg p-2 w-[360px]'>
          <View className='flex-row items-center' style={{ gap: 4 }}>
            <Text className='text-[#faa935] font-semibold'>{item?.rating}</Text>
            <FontAwesome name='star' size={16} color='#faa935' />
          </View>
          <Text className='font-semibold'>{item?.name}</Text>
          <Text>{item?.comment}</Text>
          <Text className='italic text-gray-600'>
            {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
      )}
    />
  );
};

export default ProductInfoScreen;
