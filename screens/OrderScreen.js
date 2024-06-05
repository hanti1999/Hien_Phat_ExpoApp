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
import { BASE_URL } from '../config';
import Loading from '../components/Loading';

const OrderScreen = ({ route, navigation }) => {
  const { userId } = route?.params;
  const [modalVisible, setModalVisible] = useState(false);
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
  }, []);

  // const handleDeleteOrder = async (id) => {
  //   try {
  //     const res = await axios.delete(`${BASE_URL}/orders/${id}`);
  //     const result = res.data.message;
  //     console.log(result);
  //     setModalVisible(!modalVisible);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
            className='py-3 w-full bg-primary-pink rounded-lg'
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
          <View key={i} className='p-2 mb-2 bg-white'>
            <Text>Mã đơn hàng: {o._id}</Text>
            <Text>Sản phẩm ({o.products.length}):</Text>
            {o.products.map((p, index) => (
              <Text style={{ marginLeft: 10 }} key={index}>
                {p.quantity} x {p.name}
              </Text>
            ))}
            <Text>
              Trạng thái:{' '}
              <Text className='font-bold text-blue-500'>{o?.status}</Text>
            </Text>
            <Text>
              Tổng:{' '}
              <Text className='font-bold text-blue-500'>
                {o?.totalPrice.toLocaleString()}
              </Text>
            </Text>
            <Text>
              Thời gian: {moment(o.createAt).format('DD/MM/YYYY HH:mm')}
            </Text>
            <DeleteOrder id={o._id} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const DeleteOrder = ({ id }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteOrder = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/orders/${id}`);
      const result = res.data.message;
      console.log(result);
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log(error);
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
          <View className=' p-2 rounded-lg bg-white shadow-lg'>
            <Text className='text-center my-4'>Bạn muốn hủy đơn?</Text>
            <View style={{ gap: 4 }} className='flex-row items-center'>
              <Pressable
                className='rounded w-32 h-10 justify-center border-primary-pink border'
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className='text-center'>Không</Text>
              </Pressable>
              <Pressable
                className='rounded w-32 h-10 justify-center bg-primary-pink border-primary-pink border'
                onPress={() => handleDeleteOrder()}
              >
                <Text className='text-center text-white'>Đồng ý</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        className='border border-red-500 rounded-lg py-1 mt-1 w-32'
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
