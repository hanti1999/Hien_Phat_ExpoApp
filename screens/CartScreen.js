import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  Entypo,
  Ionicons,
  FontAwesome6,
  AntDesign,
  Fontisto,
} from '@expo/vector-icons';
import React, { useContext, useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '@env';
import axios from 'axios';
import { removeFromCart, clearCart } from '../redux/slices/CartReducer';
import ScreenHeader from '../components/ScreenHeader';
import NoProduct from '../components/NoProduct';
import { UserType } from '../userContext';
import { P_PINK } from '../config';

const CartScreen = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigation = useNavigation();

  if (cartQuantity === 0) {
    return <NoProduct text={'Chưa có sản phẩm trong giỏ hàng!'} />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <StatusBar />
      <ItemInCart navigation={navigation} />
    </SafeAreaView>
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
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId, setUserId } = useContext(UserType);
  const phoneRef = useRef(null);
  let cartPoints = (cartAmount * 1) / 100;
  let voucher = 20000;

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
        totalPrice: cartAmount - voucher,
        shippingAddress: address,
        paymentMethod: paymentMethod,
        cartPoints: cartPoints,
      };

      const response = await axios.post(`${BASE_URL}/order/create`, orderData);
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
    <>
      <ScreenHeader text={'Giỏ hàng'} />
      <ScrollView className='bg-gray-100'>
        <View className='bg-pink-100 py-2'>
          <Text className='uppercase font-bold text-xl mx-2'>
            Chi tiết đơn hàng
          </Text>
          {cartItems.map((item, index) => (
            <RenderItemToCart item={item} key={index} dispatch={dispatch} />
          ))}
          <View className='flex-row justify-between items-center mt-2 mx-2'>
            <Text className='text-right text-[18px]'>Tổng tạm tính</Text>
            <Text className='text-primary-pink font-semibold text-[20px]'>
              {cartAmount?.toLocaleString()}đ
            </Text>
          </View>
          <View className='flex-row justify-between items-center mt-2 mx-2'>
            <View className='flex-row items-center'>
              <Fontisto name='ticket-alt' size={24} color='pink' />
              <Text className='text-right text-[16px]'> Ưu đãi giảm</Text>
            </View>
            <Text className='text-primary-pink text-[18px]'>
              -{voucher?.toLocaleString()}đ
            </Text>
          </View>
        </View>

        <View className='mt-2 p-2 bg-white'>
          <View className='flex-row justify-between'>
            <Text className='uppercase font-bold text-[20px] '>
              Giao hàng tới
            </Text>

            <Pressable onPress={() => setIsVisible(!isVisible)}>
              <View className='flex-row items-center'>
                <Text style={{ color: 'blue' }}>Sửa thông tin</Text>
                <Entypo name='pencil' size={20} color='blue' />
              </View>
            </Pressable>
          </View>
          <View>
            {isVisible && (
              <View>
                <Text className='my-3 text-[16px]'>Tên người nhận:</Text>
                <TextInput
                  className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
                  value={name}
                  onChangeText={setName}
                />
                <Text className='my-3 text-[16px]'>
                  Số điện thoại người nhận:
                </Text>
                <TextInput
                  value={phoneNumber}
                  ref={phoneRef}
                  keyboardType='numeric'
                  placeholder='Vui lòng điền số điện thoại'
                  onChangeText={setPhoneNumber}
                  className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
                />
              </View>
            )}
            <Text className='my-3 text-[16px]'>Địa chỉ nhận hàng:</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              multiline
              editable={isVisible}
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

        <View className='mt-2 p-2 mb-2 bg-white'>
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
      </ScrollView>

      <View className='pt-2 p-2 bg-white'>
        <View className='flex-row justify-between items-center mt-4 mb-2'>
          <Text className='text-[18px]'>Tổng thanh toán: </Text>
          <Text className='text-primary-pink font-bold text-[20px]'>
            {(cartAmount - voucher).toLocaleString()}đ
          </Text>
        </View>
        <View className='flex-row justify-between items-center mb-2'>
          <Text className='text-primary-pink'>
            Quý khách tiết kiệm được {voucher.toLocaleString()}đ
            <Image
              className='w-5 h-5'
              source={require('../assets/tulip.png')}
            />
          </Text>
          <Text className=' line-through'>{cartAmount.toLocaleString()}đ</Text>
        </View>
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
    </>
  );
};

const RenderItemToCart = ({ item, dispatch }) => {
  const width = Dimensions.get('window').width;
  const handleProduct = () => {
    dispatch(removeFromCart(item?.id));
  };

  return (
    <View
      style={{ gap: 14 }}
      className='flex-row border-b bg-pink-100 border-gray-400 items-center p-2 overflow-hidden'
    >
      <View className='w-1/2'>
        <Image
          className=' w-full rounded-lg'
          style={{ width: width / 2, height: width / 2.5 }}
          source={{ uri: item?.productImg }}
        />
      </View>
      <View className='w-1/2'>
        <View className='border-b-2 border-gray-300'>
          <Text className='font-semibold text-[18px]' numberOfLines={3}>
            {item?.title}
          </Text>
        </View>
        <Text className='mb-2 mt-4 text-[16px]'>
          Số lượng: <Text className='font-bold'>{item?.quantity}</Text> x{' '}
          {item?.price?.toLocaleString()}đ
        </Text>
        <Text className='border-t border-gray-200 mb-2 text-[16px]'>
          ={' '}
          <Text className='font-bold'>
            {(item?.quantity * item?.price)?.toLocaleString()}đ
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
