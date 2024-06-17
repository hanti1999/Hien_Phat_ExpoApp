import { View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@env';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import ProductCard from '../components/ProductCard';
import NoProduct from '../components/NoProduct';
import Loading from '../components/Loading';

const ProductsByCategoryScreen = ({ route }) => {
  const { categoryId } = route?.params;
  const [products, setProducts] = useState([]);
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
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <StatusBar />
      <ScreenHeader text={'Sản phẩm'} />
      {/* <Picker
          selectedValue={selectedValue}
          mode='dropdown'
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label='Nổi bật' value={'default'} />
          <Picker.Item label='Giá tăng dần' value={'ascending'} />
          <Picker.Item label='Giá giảm dần' value={'descending'} />
        </Picker> */}

      <FlatList
        data={products}
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
        keyExtractor={(item) => item._id}
        style={{ height: '100%' }}
      />
    </SafeAreaView>
  );
};

export default ProductsByCategoryScreen;
