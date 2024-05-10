import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import React from 'react';

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == 'android' ? 0 : 0,
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <StatusBar />
      <Navigation navigation={navigation} />
    </SafeAreaView>
  );
};

const Navigation = ({ navigation }) => {
  return (
    <View className='flex flex-row items-center'>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo name='chevron-thin-left' size={24} style={{ padding: 10 }} />
      </Pressable>
      <Text className='font-bold text-lg'>Thông báo</Text>
    </View>
  );
};

export default NotificationScreen;
