import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Platform,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { Entypo, Ionicons, FontAwesome6, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { removeFromCart, clearCart } from '../redux/slices/CartReducer';
import { BASE_URL, P_PINK } from '../config';
import { UserType } from '../userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const CartScreen = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == 'android' ? 0 : 0,
        flex: 1,
      }}
    >
      <StatusBar />
      <Navigation navigation={navigation} />
      {cartQuantity === 0 ? (
        <NoItemInCart navigation={navigation} />
      ) : (
        <ItemInCart navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const NoItemInCart = ({ navigation }) => {
  return (
    <View className='flex items-center h-full bg-gray-100 px-2'>
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
        <Text className='text-white text-lg text-center'>
          Tiếp tục mua hàng
        </Text>
      </Pressable>
    </View>
  );
};

const ItemInCart = ({ navigation }) => {
  const cartItem = useSelector((state) => state.cart.cartItems);
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodeToken = jwtDecode(token);
      const userId = decodeToken.userId;
      const userAddress = decodeToken?.address;
      const userName = decodeToken?.name;
      setUserId(userId);
      setAddress(userAddress);
      setName(userName);
    };

    fetchUser();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        name: name,
        phoneNumber: phoneNumber,
        note: note,
        cartItem: cartItem,
        totalPrice: cartAmount,
        shippingAddress: address,
        paymentMethod: paymentMethod,
      };

      const response = await axios.post(`${BASE_URL}/orders`, orderData);
      if (response.status === 200) {
        navigation.navigate('Order');
        dispatch(clearCart());
        console.log('order created successfully', response.data);
      } else {
        console.log('error creating order', response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View className='bg-white p-2'>
        <Text className='uppercase font-bold text-xl'>Chi tiết đơn hàng</Text>
        {cartItem.map((item, index) => (
          <RenderItemToCart item={item} key={index} dispatch={dispatch} />
        ))}
        <Text className='mt-2'>
          Tổng:{' '}
          <Text className='text-primary-pink font-bold text-lg'>
            {cartAmount.toLocaleString()}đ
          </Text>
        </Text>
      </View>

      <View className='mt-2.5 p-2 bg-white'>
        <Text className='uppercase font-bold text-xl '>
          Thông tin giao hàng
        </Text>
        <View>
          <Text className='italic text-red-500'>
            *Vui lòng điền đủ thông tin
          </Text>
          <Text className='my-2'>Tên người nhận</Text>
          <TextInput
            className='px-1 border rounded-lg border-gray-200'
            value={name}
            onChangeText={setName}
          />
          <Text className='my-2'>Số điện thoại người nhận</Text>
          <TextInput
            value={phoneNumber}
            keyboardType='numeric'
            onChangeText={setPhoneNumber}
            className='px-1 border rounded-lg border-gray-200'
          />
          <Text className='my-2'>Địa chỉ nhận hàng</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            className='px-1 border rounded-lg border-gray-200'
          />
          <Text className='my-2'>Ghi chú</Text>
          <TextInput
            className='px-1 border rounded-lg border-gray-200'
            value={note}
            multiline
            numberOfLines={3}
            onChangeText={setNote}
          />
        </View>
      </View>

      <View className='mt-2.5 p-2 bg-white'>
        <Text className='uppercase font-bold text-xl'>
          Phương thức thanh toán
        </Text>
        <View>
          <Pressable
            onPress={() => setPaymentMethod('cash')}
            className='flex-row border border-gray-200 rounded-lg p-2 items-center mt-2'
          >
            {paymentMethod === 'cash' ? (
              <AntDesign name='checkcircle' size={20} color={P_PINK} />
            ) : (
              <Entypo name='circle' size={20} color={P_PINK} />
            )}
            <Text className='ml-2'>Thanh toán tiền mặt khi nhận hàng</Text>
          </Pressable>

          <Pressable
            onPress={() => setPaymentMethod('card')}
            className='flex-row border border-gray-200 rounded-lg p-2 items-center mt-2'
          >
            {paymentMethod === 'card' ? (
              <AntDesign name='checkcircle' size={20} color={P_PINK} />
            ) : (
              <Entypo name='circle' size={20} color={P_PINK} />
            )}
            <Text className='ml-2'>Thanh toán chuyển khoản</Text>
          </Pressable>
        </View>
      </View>

      <View className='mt-2.5 p-2 bg-white'>
        <Pressable
          onPress={handlePlaceOrder}
          className='py-3 w-full bg-primary-pink rounded-lg '
        >
          <Text className='text-white text-lg text-center'>
            Đặt hàng nào{' '}
            <FontAwesome6 name='smile-wink' size={20} color='white' />
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Home')}
          className='py-3 w-full border-primary-pink border rounded-lg mt-2.5'
        >
          <Text className=' text-lg text-center'>Tiếp tục mua sắm</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const RenderItemToCart = ({ item, dispatch }) => {
  const handleProduct = () => {
    dispatch(removeFromCart(item?.id));
  };

  return (
    <View className='flex-row border-b border-gray-200 py-2.5'>
      <View className='w-1/2'>
        <Image className='h-32 w-full' source={item?.productImg} />
      </View>
      <View className='w-1/2'>
        <Text className='font-semibold text-base' numberOfLines={3}>
          {item?.title}
        </Text>
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
          <Ionicons name='trash' size={20} color={P_PINK} />
          <Text className='text-primary-pink'>Xoá sản phẩm</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Navigation = ({ navigation }) => {
  return (
    <View className='flex flex-row items-center bg-white'>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name='chevron-thin-left' size={24} style={{ padding: 10 }} />
      </Pressable>
      <Text className='font-bold text-lg'>Giỏ hàng</Text>
    </View>
  );
};

export default CartScreen;
