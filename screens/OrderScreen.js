import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  ActivityIndicator,
  Modal,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '@env';
import moment from 'moment';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import NoProduct from '../components/NoProduct';
import Loading from '../components/Loading';

const OrderScreen = ({ route }) => {
  const { userId } = route?.params;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}orders/${userId}`);
      const orders = res.data?.orders;
      if (res.status === 200) {
        setOrders(orders);
        setLoading(false);
        console.log('Fetch lịch sử đơn hàng thành công');
      } else {
        setLoading(false);
        console.log('Fetch đơn hàng không thành công');
      }
    } catch (error) {
      setLoading(false);
      console.log('Đơn hàng trống!', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <NoProduct text={'Bạn chưa có đơn hàng nào!'} />;
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar />
      <ScreenHeader text='Lịch sử đơn hàng' />
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RenderOrders fetchOrders={fetchOrders} item={item} />
        )}
        style={{ backgroundColor: '#f9fafb' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const RenderOrders = ({ item, fetchOrders }) => {
  return (
    <View className='py-2 px-3 mb-2 bg-white '>
      <Text className='text-[16px]'>Sản phẩm ({item?.products.length}):</Text>
      <FlatList
        data={item?.products}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <Text style={{ marginLeft: 10, fontSize: 16 }}>
            {item.quantity} x {item.title}
          </Text>
        )}
      />
      <Text className='text-[16px]'>
        Trạng thái:{' '}
        <Text
          style={{
            color: item?.status != 'Đã hủy' ? '#3b82f6' : '#fc0303',
            fontWeight: 700,
          }}
        >
          {item?.status}
        </Text>
      </Text>
      <Text className='text-[16px]'>
        Tổng:{' '}
        <Text className='font-bold text-blue-500'>
          {item?.totalPrice.toLocaleString()}
        </Text>
      </Text>
      <Text className='text-[16px]'>
        Tích điểm:{' '}
        <Text className='font-bold text-blue-500'>
          {item?.points.toLocaleString()}
        </Text>
      </Text>
      {item.status === 'Đã giao' || item.status === 'Đã hủy' ? (
        <></>
      ) : (
        <UpdateOrderButton fetchOrders={fetchOrders} id={item._id} />
      )}
      <Text className='text-[16px] mt-2 text-gray-500'>
        Thời gian: {moment(item.createAt).format('DD/MM/YYYY HH:mm')}
      </Text>
    </View>
  );
};

const UpdateOrderButton = ({ id, fetchOrders }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateOrder = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}order/${id}/cancel`);

      setLoading(true);
      if (res.status === 200) {
        setModalVisible(!modalVisible);
        Toast.show({ text1: 'Hủy đơn hàng thành công' });
        setLoading(false);
        fetchOrders();
      } else {
        setModalVisible(!modalVisible);
        Toast.show({ type: 'error', text1: 'Hủy đơn không thành công' });
        setLoading(false);
      }
    } catch (error) {
      setModalVisible(!modalVisible);
      setLoading(false);
      console.log('Lỗi (OrderScreen):', error);
      Toast.show({ type: 'error', text1: 'Hủy đơn không thành công' });
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
          <View className='py-2 px-3 rounded-xl bg-white shadow-lg'>
            <Text className='text-center my-4 text-[16px]'>
              Bạn muốn hủy đơn?
            </Text>
            <View style={{ gap: 4 }} className='flex-row items-center'>
              <TouchableOpacity
                className='rounded-xl w-32 h-10 justify-center border-primary-pink border'
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className='text-center text-[16px]'>Không</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='rounded-xl w-32 h-10 justify-center bg-primary-pink border-primary-pink border'
                onPress={handleUpdateOrder}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text className='text-center text-[16px] text-white'>
                    Đồng ý
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        className='border border-red-500 rounded-xl py-1 mt-1 w-32 flex justify-center'
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text className='text-red-500 font-semibold text-center'>
          Hủy đơn hàng
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default OrderScreen;
