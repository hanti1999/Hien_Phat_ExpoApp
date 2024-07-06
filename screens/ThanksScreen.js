import { useNavigation } from '@react-navigation/native';
import { Text, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';

const ThanksScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <LottieView
        source={require('../assets/thumbs.json')}
        style={{
          height: 260,
          width: 300,
          alignSelf: 'center',
          marginTop: 40,
          justifyContent: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        Cảm ơn bạn đã tin tưởng và ủng hộ!
      </Text>
      <LottieView
        source={require('../assets/sparkle.json')}
        style={{
          height: 300,
          position: 'absolute',
          top: 100,
          width: 300,
          alignSelf: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default ThanksScreen;
