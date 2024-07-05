import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import ProductCard from '../components/ProductCard';
import NoProduct from '../components/NoProduct';
import Loading from '../components/Loading';

const SearchResultList = ({ route }) => {
  const { input } = route?.params;
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/product/search?q=${input}`);

        if (res.status === 200) {
          const data = res.data.products;
          setProducts(data);
          setLoading(false);
          console.log('Tìm kiếm sản phẩm thành công!');
        } else {
          setLoading(false);
          console.log('Tìm kiếm không thành công!');
        }
      } catch (error) {
        setLoading(false);
        console.log('Lỗi (SearchResultList)', error);
      }
    };
    searchProduct();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <NoProduct text={'Không tìm thấy sản phẩm'} />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <StatusBar />
      <ScreenHeader text={'Kết quả tìm kiếm'} />
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1 / 2,
              alignItems: 'center',
            }}
          >
            <ProductCard item={item} />
          </View>
        )}
        numColumns={2}
        style={{ height: '100%' }}
      />
    </SafeAreaView>
  );
};

export default SearchResultList;

const styles = StyleSheet.create({});
