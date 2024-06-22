import { View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import ProductCard from '../components/ProductCard';
import NoProduct from '../components/NoProduct';

const WishlistScreen = ({ route }) => {
  const { wishlist } = route?.params;

  if (wishlist.length === 0) {
    return <NoProduct text={'Chưa có sản phẩm trong danh sách ước'} />;
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <ScreenHeader text={'Danh sách ước'} />
      <FlatList
        data={wishlist}
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
        keyExtractor={(item, index) => index}
        style={{ height: '100%' }}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;
