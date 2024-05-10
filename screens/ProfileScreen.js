import { Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS == 'android' ? 0 : 0 }}>
      <StatusBar />
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
