import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import Loading from '../components/Loading';
import { BASE_URL } from '../config';

const OrderScreen = ({ route, navigation }) => {
  const { userId } = route?.params;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/${userId}`);
        const orders = response.data?.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Đơn hàng trống!', error);
      }
    };

    fetchOrders();
  }, [orders]);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <SafeAreaView className='bg-white h-full'>
        <ScreenHeader text='Lịch sử đơn hàng' />
        <View className='flex items-center h-full bg-gray-100 px-2'>
          <Image
            style={{ maxWidth: 400, maxHeight: 400 }}
            source={require('../assets/cart.png')}
          />
          <Text className='text-[#ff725e] text-xs'>
            Image by storyset on Freepik
          </Text>

          <Text className='font-semibold text-lg my-10'>Bạn chưa đặt gì!</Text>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            className='py-3 w-full bg-primary-pink rounded-xl'
          >
            <Text className='text-white text-lg text-center'>
              Tiếp tục mua hàng
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScreenHeader text='Lịch sử đơn hàng' />
      <ScrollView className='bg-gray-100'>
        {orders.map((o, i) => (
          <View key={i} className='p-2 mb-2 bg-white '>
            <Text className='text-[16px]'>Mã đơn hàng: {o._id}</Text>
            <Text className='text-[16px]'>Sản phẩm ({o.products.length}):</Text>
            {o.products.map((p, index) => (
              <Text style={{ marginLeft: 10, fontSize: 16 }} key={index}>
                {p.quantity} x {p.name}
              </Text>
            ))}
            <Text className='text-[16px]'>
              Trạng thái:{' '}
              <Text
                style={{
                  color: o?.status != 'Đã hủy' ? '#3b82f6' : '#fc0303',
                  fontWeight: 700,
                }}
              >
                {o?.status}
              </Text>
            </Text>
            <Text className='text-[16px]'>
              Tổng:{' '}
              <Text className='font-bold text-blue-500'>
                {o?.totalPrice.toLocaleString()}
              </Text>
            </Text>
            <Text className='text-[16px]'>
              Điểm tích được:{' '}
              <Text className='font-bold text-blue-500'>
                {o?.points.toLocaleString()}
              </Text>
            </Text>
            <Text className='text-[16px] mt-2 text-gray-500'>
              Thời gian: {moment(o.createAt).format('DD/MM/YYYY HH:mm')}
            </Text>
            {o.status != 'Đã hủy' ? (
              <UpdateOrderButton id={o._id} userId={userId} />
            ) : (
              ''
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const UpdateOrderButton = ({ id, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdateOrder = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/orders/${id}`, {
        newStatus: 'Đã hủy',
        userId: userId,
      });
      const result = res.data.message;
      console.log(result);
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log('Lỗi (OrderScreen):', error);
    }
  };

  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{ backgroundColor: 'rgba( 0, 0, 0, 0.3)' }}
          className='flex-1 items-center justify-center'
        >
          <View className=' p-2 rounded-xl bg-white shadow-lg'>
            <Text className='text-center my-4 text-[16px]'>
              Bạn muốn hủy đơn?
            </Text>
            <View style={{ gap: 4 }} className='flex-row items-center'>
              <Pressable
                className='rounded w-32 h-10 justify-center border-primary-pink border'
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className='text-center text-[16px]'>Không</Text>
              </Pressable>
              <Pressable
                className='rounded w-32 h-10 justify-center bg-primary-pink border-primary-pink border'
                onPress={handleUpdateOrder}
              >
                <Text className='text-center text-[16px] text-white'>
                  Đồng ý
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        className='border border-red-500 rounded-xl py-1 mt-1 w-32'
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text className='text-red-500 font-semibold text-center'>
          Hủy đơn hàng
        </Text>
      </Pressable>
    </>
  );
};

export default OrderScreen;
