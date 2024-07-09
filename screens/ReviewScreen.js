import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import React, { useState } from 'react';
import { BASE_URL } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';

const ReviewScreen = ({ route, navigation }) => {
  const { productId, userId } = route?.params;
  const [defaultOverallRating, setDefaultOverallRating] = useState(5);
  const [defaultProductRating, setDefaultProductRating] = useState(5);
  const [defaultServiceRating, setDefaultServiceRating] = useState(5);
  const [overallRating, setOverallRating] = useState([1, 2, 3, 4, 5]);
  const [productRating, setProductRating] = useState([1, 2, 3, 4, 5]);
  const [serviceRating, setServiceRating] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');

  const handleSendReview = async () => {
    const commentData = {
      comment: comment,
      rating: defaultOverallRating,
      productRating: defaultProductRating,
      serviceRating: defaultServiceRating,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/review/create/${productId}/${userId}`,
        commentData
      );
      if (res.status === 200) {
        setLoading(false);
        Toast.show({ text1: 'Gửi đánh giá thành công' });
        navigation.goBack();
      } else {
        setLoading(false);
        Toast.show({ type: 'error', text1: 'Gửi đánh giá không thành công' });
      }
    } catch (error) {
      setLoading(false);
      console.log('Gửi đánh giá không thành công (ReviewScreen)', error);
      Toast.show({ type: 'error', text1: 'Gửi đánh giá không thành công' });
    }
  };

  return (
    <SafeAreaView className='bg-white flex-1'>
      <StatusBar />
      <ScreenHeader text={'Trở lại'} />
      <View className='py-2 px-3'>
        <View className='my-4 flex-row'>
          <View className='w-1/2'>
            <Text className='text-[16px]'>Tổng quan</Text>
          </View>
          <View className='w-1/2 flex-row justify-between'>
            {overallRating.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => setDefaultOverallRating(item)}
              >
                {item <= defaultOverallRating ? (
                  <FontAwesome name='star' size={26} color='#faa935' />
                ) : (
                  <FontAwesome name='star-o' size={26} color='black' />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className='my-4 flex-row justify-between'>
          <View className='w-1/2'>
            <Text className='text-[16px]'>Sản phẩm</Text>
          </View>
          <View className='w-1/2 flex-row justify-between'>
            {productRating.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => setDefaultProductRating(item)}
              >
                {item <= defaultProductRating ? (
                  <FontAwesome name='star' size={26} color='#faa935' />
                ) : (
                  <FontAwesome name='star-o' size={26} color='black' />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className='my-4 flex-row justify-between'>
          <View className='w-1/2'>
            <Text className='text-[16px]'>Dịch vụ</Text>
          </View>
          <View className='w-1/2 flex-row justify-between'>
            {serviceRating.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => setDefaultServiceRating(item)}
              >
                {item <= defaultServiceRating ? (
                  <FontAwesome name='star' size={26} color='#faa935' />
                ) : (
                  <FontAwesome name='star-o' size={26} color='black' />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TextInput
          value={comment}
          onChangeText={setComment}
          multiline
          placeholder='Chia sẻ trãi nghiệm của bạn'
          className='bg-white rounded-lg p-2 border border-gray-300 mt-2 min-h-[70px]'
        />
        <Pressable
          onPress={handleSendReview}
          className='h-[42px] mt-6 rounded-full bg-blue-500 flex justify-center items-center'
        >
          {loading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text className='text-white text-center font-medium'>
              Gửi đánh giá
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ReviewScreen;
