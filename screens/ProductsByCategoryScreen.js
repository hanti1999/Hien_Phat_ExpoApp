import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const ProductsByCategoryScreen = ({ route, navigation }) => {
  const { categoryId } = route?.params;
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('default');

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/product/${categoryId}`);

        if (res.status === 200) {
          const data = res.data.products;
          setProducts(data);
          setLoading(false);
        } else {
          setLoading(false);
          console.log('Fetch không thành công');
        }
      } catch (error) {
        setLoading(false);
        console.log('Lỗi ProductByCategorySceen');
      }
    };

    fetchProductById();
  }, [products]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <StatusBar />
      <ScreenHeader text={'Sản phẩm'} />
      <Picker
        selectedValue={selectedValue}
        mode='dropdown'
        style={{ borderWidth: 1, borderColor: '#ddd' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label='Nổi bật' value={'default'} />
        <Picker.Item label='Giá tăng dần' value={'ascending'} />
        <Picker.Item label='Giá giảm dần' value={'descending'} />
      </Picker>
      <ScrollView className='bg-white p-2'>
        <View className='flex-row justify-evenly flex-wrap'>
          {products?.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsByCategoryScreen;

const styles = StyleSheet.create({});
