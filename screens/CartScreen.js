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
  ActivityIndicator,
} from 'react-native';
import { Entypo, Ionicons, FontAwesome6, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '@env';
import axios from 'axios';
import { removeFromCart, clearCart } from '../redux/slices/CartReducer';
import ScreenHeader from '../components/ScreenHeader';
import { P_PINK } from '../config';
import { UserType } from '../userContext';

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
      <ScreenHeader text={'Giỏ hàng'} />
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
        className='py-4 w-full bg-primary-pink rounded-xl'
      >
        <Text className='text-white text-[18px] text-center'>
          Tiếp tục mua hàng
        </Text>
      </Pressable>
    </View>
  );
};

const ItemInCart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const { userId, setUserId } = useContext(UserType);
  const phoneRef = useRef(null);
  let cartPoints = (cartAmount * 1) / 100;

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodeToken = jwtDecode(token);
      const userAddress = decodeToken?.address;
      const userName = decodeToken?.name;
      const userPhoneNumber = decodeToken?.phoneNumber;
      setAddress(userAddress);
      setName(userName);
      setPhoneNumber(userPhoneNumber);
    };

    fetchUser();
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    if (phoneNumber === '') {
      Alert.alert('Thông báo', 'Vui lòng điền số điện thoại!');
      phoneRef.current.focus();
      setLoading(false);
      return;
    }
    try {
      const orderData = {
        userId: userId,
        name: name,
        phoneNumber: phoneNumber,
        note: note,
        cartItems: cartItems,
        totalPrice: cartAmount,
        shippingAddress: address,
        paymentMethod: paymentMethod,
        cartPoints: cartPoints,
      };

      const response = await axios.post(`${BASE_URL}/orders`, orderData);
      if (response.status === 200) {
        navigation.navigate('Thanks');
        dispatch(clearCart());
        setLoading(false);
        console.log('Tạo đơn hàng thành công');
      } else {
        setLoading(false);
        console.log('Tạo đơn hàng không thành công');
      }
    } catch (error) {
      setLoading(false);
      console.log('Lỗi (CartScreen): ', error);
    }
  };

  return (
    <ScrollView className='bg-gray-100'>
      <View className='bg-white p-2'>
        <Text className='uppercase font-bold text-xl'>Chi tiết đơn hàng</Text>
        {cartItems.map((item, index) => (
          <RenderItemToCart item={item} key={index} dispatch={dispatch} />
        ))}
        <Text className='mt-2 text-[16px]'>
          Tổng:{' '}
          <Text className='text-primary-pink font-bold text-lg'>
            {cartAmount.toLocaleString()}đ
          </Text>
        </Text>
      </View>

      <View className='mt-2 p-2 bg-white'>
        <Text className='uppercase font-bold text-xl '>
          Thông tin giao hàng
        </Text>
        <View>
          <Text className='my-3 text-[16px]'>Tên người nhận:</Text>
          <TextInput
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
            value={name}
            onChangeText={setName}
          />
          <Text className='my-3 text-[16px]'>Số điện thoại người nhận:</Text>
          <TextInput
            value={phoneNumber}
            ref={phoneRef}
            keyboardType='numeric'
            placeholder='Vui lòng điền số điện thoại'
            onChangeText={setPhoneNumber}
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
          />
          <Text className='my-3 text-[16px]'>Địa chỉ nhận hàng:</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
          />
          <Text className='my-3 text-[16px]'>Ghi chú:</Text>
          <TextInput
            className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
            value={note}
            placeholder='(Không bắt buộc)'
            onChangeText={setNote}
          />
        </View>
      </View>

      <View className='mt-2 p-2 bg-white'>
        <Text className='uppercase font-bold text-xl'>
          Phương thức thanh toán
        </Text>
        <View>
          <Pressable
            onPress={() => setPaymentMethod('cash')}
            style={{ gap: 8 }}
            className='flex-row border border-gray-300 rounded-xl p-2 items-center mt-2'
          >
            {paymentMethod === 'cash' ? (
              <AntDesign name='checkcircle' size={20} color={P_PINK} />
            ) : (
              <Entypo name='circle' size={20} color={P_PINK} />
            )}
            <Text className='text-[16px]'>
              Thanh toán tiền mặt khi nhận hàng
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setPaymentMethod('card')}
            style={{ gap: 8 }}
            className='flex-row border border-gray-300 rounded-xl p-2 items-center mt-2'
          >
            {paymentMethod === 'card' ? (
              <AntDesign name='checkcircle' size={20} color={P_PINK} />
            ) : (
              <Entypo name='circle' size={20} color={P_PINK} />
            )}
            <Text className='text-[16px]'>Thanh toán chuyển khoản</Text>
          </Pressable>
        </View>
      </View>

      <View className='mt-2 p-2 bg-white'>
        <Pressable
          onPress={handlePlaceOrder}
          style={{ gap: 8 }}
          disabled={loading}
          className='h-[60px] w-full bg-primary-pink flex-row items-center justify-center rounded-xl '
        >
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <>
              <Text className='text-white text-[18px] text-center'>
                Đặt hàng nào
              </Text>
              <FontAwesome6 name='smile-wink' size={20} color='white' />
            </>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Home')}
          className='h-[60px] flex justify-center w-full border-primary-pink border rounded-xl mt-2'
        >
          <Text className=' text-[18px] text-center'>Tiếp tục mua sắm</Text>
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
        <Image className='h-[120px] w-full' source={item?.productImg} />
      </View>
      <View className='w-1/2'>
        <Text className='font-semibold text-base' numberOfLines={3}>
          {item?.title}
        </Text>
        <Text className='my-2 text-[16px]'>
          Số lượng: <Text className='font-bold'>{item?.quantity}</Text> x{' '}
          {item?.price.toLocaleString()}đ
        </Text>
        <Text className='border-t border-gray-200 mb-2 text-[16px]'>
          ={' '}
          <Text className='font-bold'>
            {(item?.quantity * item?.price).toLocaleString()}đ
          </Text>
        </Text>
        <Pressable onPress={handleProduct} className='flex-row items-center'>
          <Ionicons name='trash' size={20} color={P_PINK} />
          <Text className='text-primary-pink text-[16px]'>Xoá sản phẩm</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CartScreen;
