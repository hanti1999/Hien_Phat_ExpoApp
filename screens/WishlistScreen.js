import { SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import ProductCard from '../components/ProductCard';
import NoProduct from '../components/NoProduct';

const WishlistScreen = ({ route }) => {
  const { wishlist, userId } = route?.params;

  if (wishlist.length === 0) {
    return <NoProduct text={'Chưa có sản phẩm trong danh sách ước'} />;
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader text={'Danh sách yêu thích'} />
      <FlatList
        data={wishlist}
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

export default WishlistScreen;
