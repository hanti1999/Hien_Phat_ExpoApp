import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { removeFromCart } from '../redux/slices/CartReducer';

const CartScreen = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == 'android' ? 0 : 0,
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <StatusBar />
      <Navigation navigation={navigation} />
      {cartQuantity === 0 ? (
        <NoItemInCart navigation={navigation} />
      ) : (
        <ItemInCart />
      )}
    </SafeAreaView>
  );
};

const NoItemInCart = ({ navigation }) => {
  return (
    <View className='flex items-center h-full bg-gray-100 px-2.5'>
      <Image
        style={{ maxWidth: 400, maxHeight: 400 }}
        source={require('../assets/cart.png')}
      />
      <Text className='text-[#ff725e] text-xs'>
        Image by storyset on Freepik
      </Text>

      <Text className='font-semibold text-lg my-10'>
        Chưa có sản phẩm trong giỏ hàng!
      </Text>
      <Pressable
        onPress={() => navigation.navigate('Home')}
        className='py-3 w-full bg-primary-pink rounded-lg'
      >
        <Text className='text-white text-lg text-center font-semibold'>
          Tiếp tục mua hàng
        </Text>
      </Pressable>
    </View>
  );
};

const ItemInCart = () => {
  const cartItem = useSelector((state) => state.cart.cartItems);
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <ScrollView className='px-2.5'>
      <View>
        <Text className='uppercase font-bold text-xl'>Chi tiết đơn hàng</Text>
        {cartItem.map((item, index) => (
          <RenderItemToCart item={item} key={index} dispatch={dispatch} />
        ))}
        <Text>
          Tổng:{' '}
          <Text className='text-primary-pink font-bold'>
            {cartAmount.toLocaleString()}đ
          </Text>
        </Text>
      </View>

      <View>
        <Text className='uppercase font-bold text-xl'>Thông tin giao hàng</Text>
      </View>
    </ScrollView>
  );
};

const RenderItemToCart = ({ item, dispatch }) => {
  const handleProduct = () => {
    dispatch(removeFromCart(item?.id));
  };

  return (
    <View className='flex-row border-y border-gray-200 py-2.5'>
      <View className='w-1/2'>
        <Image className='h-32 w-full' source={item?.productImg} />
      </View>
      <View className='w-1/2'>
        <Text numberOfLines={2}>{item?.title}</Text>
        <Text className='my-2'>
          Số lượng: <Text className='font-bold'>{item?.quantity}</Text> x{' '}
          {item?.price.toLocaleString()}đ
        </Text>
        <Text className='border-t border-gray-200 mb-2'>
          ={' '}
          <Text className='font-bold'>
            {(item?.quantity * item?.price).toLocaleString()}đ
          </Text>
        </Text>
        <Pressable onPress={handleProduct} className='flex-row items-center'>
          <Ionicons name='trash' size={20} color='#fb77c5' />
          <Text className='text-primary-pink'>Xoá sản phẩm</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Navigation = ({ navigation }) => {
  return (
    <View className='flex flex-row items-center'>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name='chevron-thin-left' size={24} style={{ padding: 10 }} />
      </Pressable>
      <Text className='font-bold text-lg'>Giỏ hàng</Text>
    </View>
  );
};

export default CartScreen;
