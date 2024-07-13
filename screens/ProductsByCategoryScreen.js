import { SafeAreaView, StatusBar, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { EXPO_PUBLIC_API } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import ProductCard from '../components/ProductCard';
import NoProduct from '../components/NoProduct';
import Loading from '../components/Loading';

const ProductsByCategoryScreen = ({ route }) => {
  const { categoryId, userId } = route?.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await axios.get(
          `${EXPO_PUBLIC_API}/product/category/${categoryId}`
        );

        if (res.status === 200) {
          const data = res.data.products;
          setProducts(data);
          setLoading(false);
          console.log('Fetch sản phẩm thành công');
        } else {
          setLoading(false);
          console.log('Fetch sản phẩm không thành công');
        }
      } catch (error) {
        setLoading(false);
        console.log('Lỗi ProductByCategorySceen', error);
      }
    };

    fetchProductById();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <NoProduct text={'Chưa có sản phẩm'} />;
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar />
      <ScreenHeader text={'Sản phẩm'} />

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard item={item} userId={userId} size={0.5} />
        )}
        numColumns={2}
        keyExtractor={(item, index) => index}
        style={{ height: '100%' }}
      />
    </SafeAreaView>
  );
};

export default ProductsByCategoryScreen;
