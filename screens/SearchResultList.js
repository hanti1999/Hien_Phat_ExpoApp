import { SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { EXPO_PUBLIC_API } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import ProductCard from '../components/ProductCard';
import NoProduct from '../components/NoProduct';
import Loading from '../components/Loading';

const SearchResultList = ({ route }) => {
  const { input, userId } = route?.params;
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProduct = async () => {
      try {
        const url = `${EXPO_PUBLIC_API}/product/search?q=${input}`;
        const res = await axios.get(url);

        if (res.status === 200) {
          const data = res.data.products;
          setProducts(data);
        } else {
          console.log('Tìm kiếm không thành công!');
        }
      } catch (error) {
        console.log('Lỗi (SearchResultList)', error);
      } finally {
        setLoading(false);
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
    <SafeAreaView className='bg-white flex-1'>
      <ScreenHeader text={'Kết quả tìm kiếm'} />
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductCard item={item} userId={userId} size={0.5} />
        )}
        numColumns={2}
        style={{ height: '100%' }}
      />
    </SafeAreaView>
  );
};

export default SearchResultList;
