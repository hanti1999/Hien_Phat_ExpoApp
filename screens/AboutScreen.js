import { Text, View, SafeAreaView, StatusBar, Image } from 'react-native';
import React from 'react';
import ScreenHeader from '../components/ScreenHeader';

const AboutScreen = () => {
  return (
    <SafeAreaView className='bg-white'>
      <StatusBar />
      <ScreenHeader text={'Thông tin công ty'} />
      <View className='px-3 py-2'>
        <Image className='w-24 h-24' source={require('../assets/logoHp.png')} />
        <Text>CÔNG TY TNHH HIỀN PHÁT VI NA</Text>
        <Text>
          Trụ sở: Quốc lộ 51, Ấp 7, Xã An Phước, Huyện Long Thành, Đồng Nai
        </Text>
        <Text>
          Giấy chứng nhận đăng ký doanh nghiệp số: 3603240938 do Sở Kế Hoạch và
          Đầu Tư tỉnh Đồng Nai cấp lần đầu ngày 30/12/2014
        </Text>
        <Text>Email: gashienphat1979@gmail.com</Text>
        <Text>Điện thoại: 02513 511 610 - 0975 841 582</Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
