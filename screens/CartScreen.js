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
  Switch,
} from 'react-native';
import {
  FontAwesome6,
  AntDesign,
  MaterialIcons,
  Fontisto,
} from '@expo/vector-icons';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '@env';
import axios from 'axios';
import { removeFromCart, clearCart } from '../redux/slices/CartReducer';
import ScreenHeader from '../components/ScreenHeader';
import NoProduct from '../components/NoProduct';
import Loading from '../components/Loading';
import { UserType } from '../userContext';
import { P_PINK } from '../config';

const CartScreen = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userId, setUserId } = useContext(UserType);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [totalAmount, setTotalAmount] = useState(cartAmount);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [usePoint, setUsePoint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const phoneRef = useRef(null);
  let cartPoints = Math.round((totalAmount * 1) / 100);
  let voucher = 0;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/${userId}`);
        const user = res.data.user;
        if (res.status === 200) {
          setAddress(user?.address);
          setName(user?.name);
          setPhoneNumber(user?.phoneNumber);
          setUserPoints(user?.points);
          setLoading(false);
          console.log('Fetch thông tin người dùng thành công');
        } else {
          setLoading(false);
          console.log('Fetch thông tin người dùng không thành công');
        }
      } catch (error) {
        setLoading(false);
        console.log('Lỗi (catch ProfileScreen): ', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    setTotalAmount(cartAmount);
  }, [cartAmount]);

  const handlePlaceOrder = async () => {
    setOrderLoading(true);
    if (phoneNumber === '') {
      Alert.alert('Thông báo', 'Vui lòng điền số điện thoại!');
      setIsVisible(true);
      phoneRef.current.focus();
      setOrderLoading(false);
      return;
    }
    try {
      const orderData = {
        userId: userId,
        name: name,
        phoneNumber: phoneNumber,
        note: note,
        cartItems: cartItems,
        totalPrice: totalAmount,
        shippingAddress: address,
        paymentMethod: paymentMethod,
        cartPoints: cartPoints,
        usePoint: usePoint,
      };

      const response = await axios.post(`${BASE_URL}/order/create`, orderData);
      if (response.status === 200) {
        navigation.navigate('Thanks');
        dispatch(clearCart());
        setOrderLoading(false);
        console.log('Tạo đơn hàng thành công');
      } else {
        setOrderLoading(false);
        console.log('Tạo đơn hàng không thành công');
      }
    } catch (error) {
      setOrderLoading(false);
      console.log('Lỗi (CartScreen): ', error);
    }
  };

  const toggleSwitch = () => {
    setUsePoint(!usePoint);
    setTotalAmount(
      usePoint ? totalAmount + userPoints : totalAmount - userPoints
    );
  };

  if (cartQuantity === 0) {
    return <NoProduct text={'Chưa có sản phẩm trong giỏ hàng!'} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <StatusBar />
      <ScreenHeader text={'Giỏ hàng'} />
      <ScrollView className='bg-gray-100' showsVerticalScrollIndicator={false}>
        <View className='bg-pink-100 py-2 px-3 mb-2'>
          <Text className='uppercase font-bold text-xl'>Chi tiết đơn hàng</Text>
          {cartItems.map((item, index) => (
            <RenderItemToCart item={item} key={index} dispatch={dispatch} />
          ))}
          <View className='flex-row justify-between items-center mt-2'>
            <Text className='text-right text-[18px]'>Tổng tạm tính</Text>
            <Text className='text-primary-pink font-semibold text-[20px]'>
              {cartAmount?.toLocaleString()}đ
            </Text>
          </View>
          {voucher != 0 && (
            <View className='flex-row justify-between items-center mt-2'>
              <View className='flex-row items-center' style={{ gap: 4 }}>
                <Fontisto name='ticket-alt' size={24} color='pink' />
                <Text className='text-right text-[16px]'>Ưu đãi giảm</Text>
              </View>
              <Text className='text-primary-pink text-[18px]'>0đ</Text>
            </View>
          )}
          <View className='flex-row justify-between items-center mt-2'>
            <View className='flex-row items-center' style={{ gap: 4 }}>
              <MaterialIcons name='wallet' size={24} color='pink' />
              <Text className='text-right text-[16px]'>
                Dùng {userPoints?.toLocaleString()} điểm
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: P_PINK }}
              onValueChange={toggleSwitch}
              value={usePoint}
            />
          </View>
        </View>

        <View className='mb-2 py-2 px-3 bg-white'>
          <View className='flex-row justify-between'>
            <Text className='uppercase font-bold text-[20px] '>
              Giao hàng tới
            </Text>

            <Pressable onPress={() => setIsVisible(!isVisible)}>
              <View className='flex-row items-center' style={{ gap: 4 }}>
                <Text style={{ color: 'blue', fontSize: 16 }}>
                  Sửa thông tin
                </Text>
                <FontAwesome6 name='pencil' size={16} color='blue' />
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

                <Text className='my-3 text-[16px]'>Ghi chú:</Text>
                <TextInput
                  value={note}
                  onChangeText={setNote}
                  multiline
                  placeholder='(Không bắt buộc)'
                  className='h-[70px] px-2 border rounded-xl border-gray-300 text-[16px]'
                />
              </View>
            )}
            <Text className='my-3 text-[16px]'>Số điện thoại người nhận:</Text>
            <TextInput
              value={phoneNumber}
              ref={phoneRef}
              keyboardType='numeric'
              placeholder='Vui lòng điền số điện thoại'
              editable={isVisible}
              onChangeText={setPhoneNumber}
              className='px-2 py-3 border rounded-xl border-gray-300 text-[16px]'
              style={{ backgroundColor: isVisible ? 'white' : '#e5e7eb' }}
            />
            <Text className='my-3 text-[16px]'>Địa chỉ nhận hàng:</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              multiline
              editable={isVisible}
              className='px-2 h-[70px] border rounded-xl border-gray-300 text-[16px]'
              style={{ backgroundColor: isVisible ? 'white' : '#e5e7eb' }}
            />
          </View>
        </View>

        <View className='py-2 px-3 mb-2 bg-white'>
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
                <FontAwesome6 name='circle' size={20} color={P_PINK} />
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
                <FontAwesome6 name='circle' size={20} color={P_PINK} />
              )}
              <Text className='text-[16px]'>Thanh toán chuyển khoản</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View className='pt-2 py-2 px-3 bg-white'>
        <View className='flex-row justify-between items-center my-2'>
          <Text className='text-[18px]'>Tổng thanh toán: </Text>
          <Text className='text-primary-pink font-bold text-[20px]'>
            {totalAmount.toLocaleString()}đ
          </Text>
        </View>
        <View className='flex-row justify-between items-center mb-2'>
          <Text className='text-primary-pink'>
            Quý khách tiết kiệm được{' '}
            {(cartAmount - totalAmount).toLocaleString()}
            đ
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
          disabled={orderLoading}
          className='h-[60px] w-full bg-primary-pink flex-row items-center justify-center rounded-xl '
        >
          {orderLoading ? (
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
    </SafeAreaView>
  );
};

const RenderItemToCart = ({ item, dispatch }) => {
  const width = Dimensions.get('window').width;
  const handleProduct = () => {
    dispatch(removeFromCart(item?.id));
  };

  return (
    <View
      style={{ gap: 8 }}
      className='flex-row border-b bg-pink-100 border-gray-400 items-center py-2'
    >
      <View style={{ width: width / 2 }}>
        <Image
          className=' w-full rounded-lg'
          style={{ width: width / 2, height: width / 2.5 }}
          source={{ uri: item?.productImg }}
        />
      </View>
      <View style={{ width: width / 2, overflow: 'hidden' }}>
        <View className='border-b-2 border-gray-300'>
          <Text className='font-semibold text-[18px]' numberOfLines={3}>
            {item?.title}
          </Text>
        </View>
        <Text className='mb-2 mt-4 text-[16px]'>
          Số lượng: <Text className='font-bold'>{item?.quantity}</Text> x{' '}
          {item?.price?.toLocaleString()}đ
        </Text>
        <Text className='font-bold text-[16px] mb-2'>
          = {(item?.quantity * item?.price)?.toLocaleString()}đ
        </Text>
        <Pressable
          onPress={handleProduct}
          className='flex-row items-center'
          style={{ gap: 4 }}
        >
          <Fontisto name='trash' size={20} color={P_PINK} />
          <Text className='text-primary-pink text-[16px]'>Xoá sản phẩm</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CartScreen;
