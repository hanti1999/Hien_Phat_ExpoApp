import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const cartItem = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <Navigation />
      {cartItem.length === 0 ? (
        <NoItemInCart navigation={navigation} />
      ) : (
        <ScrollView>
          <Text>CartScreen</Text>
        </ScrollView>
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

const Navigation = () => {
  const navigation = useNavigation();
  return (
    <View className='flex flex-row items-center'>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name='chevron-left' size={32} style={{ padding: 10 }} />
      </Pressable>
      <Text className='font-bold text-lg'>Giỏ hàng</Text>
    </View>
  );
};

export default CartScreen;
