import {
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  Modal,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { EXPO_PUBLIC_API } from '@env';
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
      const res = await axios.get(`${EXPO_PUBLIC_API}/order/${userId}`);
      const orders = res.data?.orders.reverse();
      if (res.status === 200) {
        setOrders(orders);
      } else {
        console.error('Fetch đơn hàng không thành công');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      <ScreenHeader text='Lịch sử đơn hàng' />
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RenderOrders fetchOrders={fetchOrders} item={item} />
        )}
        style={{ backgroundColor: '#fff' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const RenderOrders = ({ item, fetchOrders }) => {
  return (
    <View className='py-2 px-3 mb-3 bg-pink-100'>
      <Text className='text-[16px] text-gray-500 font-semibold italic'>
        <AntDesign name='calendar' size={16} color='black' />
        Thời gian: {moment(item.createAt).format('DD/MM/YYYY _ HH:mm')}
      </Text>
      <Text className='text-[17px] my-1 italic font-semibold'>
        <AntDesign name='shoppingcart' size={16} color='black' />
        Đơn hàng: ({item?.products.length})
      </Text>
      <FlatList
        data={item?.products}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View className='flex-row border-2 border-gray-500'>
            <View className='p-1 flex-1'>
              <View className='flex-row items-center'>
                <AntDesign name='star' size={12} />
                <Text className='text-[16px] italic font-semibold text-pink-500'>
                  {item.title}
                </Text>
              </View>
            </View>
            <View className='p-1'>
              <Text className='text-right font-semibold'>
                x {item.quantity}
              </Text>
              <Text className='text-right italic'>
                ({item?.price.toLocaleString()})
              </Text>
              <Text className='text-right font-semibold text-[16px]'>
                {(item?.price * item?.quantity)?.toLocaleString()} đ
              </Text>
            </View>
          </View>
        )}
      />
      <View className='flex-row' style={{ gap: 4 }}>
        <View>
          <Text className='text-[16px]'>Trạng thái</Text>
          <Text className='text-[16px]'>Tổng</Text>
          <Text>Tích điểm</Text>
        </View>
        <View>
          <Text className='text-[16px]'>:</Text>
          <Text className='text-[16px]'>:</Text>
          <Text>:</Text>
        </View>
        <View>
          <Text
            style={{
              color: item?.status != 'Đã hủy' ? '#3b82f6' : '#fc0303',
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {item?.status}
          </Text>
          <Text className='font-bold text-[16px]'>
            {item?.totalPrice.toLocaleString()} (vnđ)
          </Text>
          <Text>{item?.points.toLocaleString()}</Text>
        </View>
      </View>
      {item.status === 'Đã giao' || item.status === 'Đã hủy' ? (
        <></>
      ) : (
        <UpdateOrderButton fetchOrders={fetchOrders} id={item._id} />
      )}
    </View>
  );
};

const UpdateOrderButton = ({ id, fetchOrders }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateOrder = async () => {
    try {
      const res = await axios.patch(`${EXPO_PUBLIC_API}/order/${id}/cancel`);

      setLoading(true);
      if (res.status === 200) {
        Toast.show({ text1: 'Hủy đơn hàng thành công' });
        fetchOrders();
      } else {
        Toast.show({ type: 'error', text1: 'Hủy đơn không thành công' });
      }
    } catch (error) {
      console.error('Lỗi (OrderScreen):', error);
      Toast.show({ type: 'error', text1: 'Hủy đơn không thành công' });
    } finally {
      setModalVisible(!modalVisible);
      setLoading(false);
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
                disabled={loading}
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
