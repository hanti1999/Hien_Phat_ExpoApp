import {
  Text,
  Image,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SeeMoreCard from '../components/SeeMoreCard';
import SearchBar from '../components/SearchBar';
import HorizontalCategory from '../components/HorizontalCategory';
import ProductTitle from '../components/ProductTitle';

const slider = [
  require('../assets/slider-img/slider1.png'),
  require('../assets/slider-img/slider2.png'),
  require('../assets/slider-img/slider3.png'),
];

const sale = [
  {
    id: 0,
    title: 'Bếp gas âm Ogawa OG-207B',
    oldPrice: 1990000,
    price: 1750000,
    image: require('../assets/products/ogawa-og-207b.jpg'),
    carouselImages: [
      require('../assets/products/ogawa-og-207b.jpg'),
      require('../assets/products/ogawa-og-207b.jpg'),
      require('../assets/products/ogawa-og-207b.jpg'),
      require('../assets/products/ogawa-og-207b.jpg'),
    ],
  },
  {
    id: 1,
    title: 'Bếp gas âm SankaTech SKT-795',
    oldPrice: 2490000,
    price: 2190000,
    image: require('../assets/products/sanka-skt-795.jpg'),
    carouselImages: [
      require('../assets/products/sanka-skt-795.jpg'),
      require('../assets/products/sanka-skt-795.jpg'),
      require('../assets/products/sanka-skt-795.jpg'),
      require('../assets/products/sanka-skt-795.jpg'),
    ],
  },
  {
    id: 2,
    title: 'Bếp gas âm Rinnai RVB-2BG',
    oldPrice: 4200000,
    price: 3790000,
    image: require('../assets/products/rinnai-rvb-2bg.jpg'),
    carouselImages: [
      require('../assets/products/rinnai-rvb-2bg.jpg'),
      require('../assets/products/rinnai-rvb-2bg.jpg'),
      require('../assets/products/rinnai-rvb-2bg.jpg'),
      require('../assets/products/rinnai-rvb-2bg.jpg'),
    ],
  },
  {
    id: 3,
    title: 'Bếp gas âm Rinnai RVB 2i(AB)',
    oldPrice: 5200000,
    price: 4950000,
    image: require('../assets/products/rinnai-rvb-2iab.jpg'),
    carouselImages: [
      require('../assets/products/rinnai-rvb-2iab.jpg'),
      require('../assets/products/rinnai-rvb-2iab.jpg'),
      require('../assets/products/rinnai-rvb-2iab.jpg'),
      require('../assets/products/rinnai-rvb-2iab.jpg'),
    ],
  },
];

const bepGas = [
  {
    id: 0,
    title: 'Bếp gas mini NaMilux inox',
    oldPrice: 300000,
    price: 280000,
    image: require('../assets/products/Namilux-mini-inox.jpg'),
    carouselImages: [
      require('../assets/products/Namilux-mini-inox.jpg'),
      require('../assets/products/Namilux-mini-inox.jpg'),
      require('../assets/products/Namilux-mini-inox.jpg'),
      require('../assets/products/Namilux-mini-inox.jpg'),
    ],
  },
  {
    id: 1,
    title: 'Bếp gas đơn Nasonal NA250D',
    oldPrice: 380000,
    price: 360000,
    image: require('../assets/products/nasonal-na250d.jpg'),
    carouselImages: [
      require('../assets/products/nasonal-na250d.jpg'),
      require('../assets/products/nasonal-na250d.jpg'),
      require('../assets/products/nasonal-na250d.jpg'),
      require('../assets/products/nasonal-na250d.jpg'),
    ],
  },
  {
    id: 2,
    title: 'Bếp gas đôi Hudo 7Slim',
    oldPrice: '',
    price: 580000,
    image: require('../assets/products/hudo-7slim.jpg'),
    carouselImages: [
      require('../assets/products/hudo-7slim.jpg'),
      require('../assets/products/hudo-7slim.jpg'),
      require('../assets/products/hudo-7slim.jpg'),
      require('../assets/products/hudo-7slim.jpg'),
    ],
  },
  {
    id: 3,
    title: 'Bếp gas đôi Akia 7SI/7Slim',
    oldPrice: 1790000,
    price: 1690000,
    image: require('../assets/products/Akia-7.jpg'),
    carouselImages: [
      require('../assets/products/Akia-7.jpg'),
      require('../assets/products/Akia-7.jpg'),
      require('../assets/products/Akia-7.jpg'),
      require('../assets/products/Akia-7.jpg'),
    ],
  },
];

const bepDien = [
  {
    id: 0,
    title: 'Bếp điện đơn Sakura SE3150B',
    oldPrice: 1250000,
    price: 999000,
    image: require('../assets/products/sakura-se3150b.jpg'),
    carouselImages: [
      require('../assets/products/sakura-se3150b.jpg'),
      require('../assets/products/sakura-se3150b.jpg'),
      require('../assets/products/sakura-se3150b.jpg'),
      require('../assets/products/sakura-se3150b.jpg'),
    ],
  },
  {
    id: 1,
    title: 'Bếp từ đơn Kaff KF330i',
    oldPrice: 3080000,
    price: 2310000,
    image: require('../assets/products/kaff-kf330i.jpg'),
    carouselImages: [
      require('../assets/products/kaff-kf330i.jpg'),
      require('../assets/products/kaff-kf330i.jpg'),
      require('../assets/products/kaff-kf330i.jpg'),
      require('../assets/products/kaff-kf330i.jpg'),
    ],
  },
  {
    id: 2,
    title: 'Bếp từ đôi Chiffs CH112S',
    oldPrice: 8500000,
    price: 5950000,
    image: require('../assets/products/chiffs-ch112s.jpg'),
    carouselImages: [
      require('../assets/products/chiffs-ch112s.jpg'),
      require('../assets/products/chiffs-ch112s.jpg'),
      require('../assets/products/chiffs-ch112s.jpg'),
      require('../assets/products/chiffs-ch112s.jpg'),
    ],
  },
  {
    id: 3,
    title: 'Bếp điện từ Kaff KF-FL866GIH',
    oldPrice: 14800000,
    price: 11100000,
    image: require('../assets/products/kaff-kffl866gih.jpg'),
    carouselImages: [
      require('../assets/products/kaff-kffl866gih.jpg'),
      require('../assets/products/kaff-kffl866gih.jpg'),
      require('../assets/products/kaff-kffl866gih.jpg'),
      require('../assets/products/kaff-kffl866gih.jpg'),
    ],
  },
];

const mayLocNuoc = [
  {
    id: 0,
    title: 'Máy lọc nước để gầm Mutosi MP370U',
    oldPrice: 5925000,
    price: 2962500,
    image: require('../assets/products/mutosi-mp370u.jpg'),
    carouselImages: [
      require('../assets/products/mutosi-mp370u.jpg'),
      require('../assets/products/mutosi-mp370u.jpg'),
      require('../assets/products/mutosi-mp370u.jpg'),
      require('../assets/products/mutosi-mp370u.jpg'),
    ],
  },
  {
    id: 1,
    title: 'Máy lọc nước nóng nguội Mutosi MP582H',
    oldPrice: 7690000,
    price: 3845000,
    image: require('../assets/products/mutosi-mp582h.jpg'),
    carouselImages: [
      require('../assets/products/mutosi-mp582h.jpg'),
      require('../assets/products/mutosi-mp582h.jpg'),
      require('../assets/products/mutosi-mp582h.jpg'),
      require('../assets/products/mutosi-mp582h.jpg'),
    ],
  },
  {
    id: 2,
    title: 'Máy lọc nước DaikioSan DSW32009H2',
    oldPrice: 5300000,
    price: 3975000,
    image: require('../assets/products/daikiosan-dsw-32009h2.jpg'),
    carouselImages: [
      require('../assets/products/daikiosan-dsw-32009h2.jpg'),
      require('../assets/products/daikiosan-dsw-32009h2.jpg'),
      require('../assets/products/daikiosan-dsw-32009h2.jpg'),
      require('../assets/products/daikiosan-dsw-32009h2.jpg'),
    ],
  },
];

const mayHutMui = [
  {
    id: 0,
    title: 'Máy hút mùi âm tủ/nổi Faster SYP 6003/7003',
    oldPrice: '',
    price: 4650000,
    image: require('../assets/products/Faster-syp-7003.jpg'),
    carouselImages: [
      require('../assets/products/Faster-syp-7003.jpg'),
      require('../assets/products/Faster-syp-7003.jpg'),
      require('../assets/products/Faster-syp-7003.jpg'),
      require('../assets/products/Faster-syp-7003.jpg'),
    ],
  },
  {
    id: 1,
    title: 'Máy hút mùi Fancy FA70S',
    oldPrice: '',
    price: 2700000,
    image: require('../assets/products/Fancy-fa70ss.jpg'),
    carouselImages: [
      require('../assets/products/Fancy-fa70ss.jpg'),
      require('../assets/products/Fancy-fa70ss.jpg'),
      require('../assets/products/Fancy-fa70ss.jpg'),
      require('../assets/products/Fancy-fa70ss.jpg'),
    ],
  },
];

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    // fetchData();
  }, []);

  // console.log(products);

  return (
    <SafeAreaView
      className=' flex-1 bg-primary-pink'
      style={{ paddingTop: Platform.OS == 'android' ? 20 : 0 }}
    >
      <ScrollView stickyHeaderIndices={[0]} className='bg-gray-100'>
        <SearchBar />

        <HorizontalCategory />

        <SliderBox
          images={slider}
          autoplay
          circleLoop
          dotColor={'#302671'}
          inactiveDotColor='#333'
          ImageComponentStyle={{ width: '100%' }}
        />

        <View className='flex-row items-center justify-between bg-white'>
          <Text className='font-bold text-2xl p-2.5 text-red-500'>
            Khuyến Mãi Hot
          </Text>
          <Pressable
            onPress={() => Alert.alert('Thông báo', 'Clicked')}
            className='flex-row items-center'
          >
            <Text className='text-blue-400 font-medium'>
              Xem thêm khuyến mãi
            </Text>
            <Entypo name='chevron-right' size={24} color='#60a5fa' />
          </Pressable>
        </View>

        <ScrollView horizontal className='bg-white pl-2'>
          {sale.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
          <SeeMoreCard />
        </ScrollView>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Bếp gas'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {bepGas.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
            <SeeMoreCard />
          </ScrollView>
        </View>

        <View>
          <Pressable onPress={() => Alert.alert('Thông báo', 'Clicked')}>
            <Image
              className='w-full h-[60px]'
              source={require('../assets/sale8-3.jpg')}
            />
          </Pressable>
        </View>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Bếp điện'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {bepDien.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
            <SeeMoreCard />
          </ScrollView>
        </View>

        <View>
          <Pressable onPress={() => Alert.alert('Thông báo', 'Clicked')}>
            <Image
              className='w-full h-[140px]'
              source={require('../assets/DonTetSaleHet_MayLocNuoc.png')}
            />
          </Pressable>
        </View>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Máy lọc nước'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {mayLocNuoc.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
            <SeeMoreCard />
          </ScrollView>
        </View>

        <View className='border-t-2 border-primary-pink mt-5 relative bg-white'>
          <ProductTitle text={'Máy hút mùi'} />

          <ScrollView horizontal className='px-2 mt-10'>
            {mayHutMui.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
            <SeeMoreCard />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
