import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import StackNavigator from './navigation/StackNavigator';
import { UserContext } from './userContext';
import openLink from './utils/openLink';
import { store } from './redux/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
          <View style={styles.floatButtonContainer}>
            <OpenURLButton phoneNumber='0975841582'>
              <AntDesign name='phone' size={26} color='white' />
            </OpenURLButton>
          </View>
        </UserContext>
        <Toast visibilityTime={2000} topOffset={60} />
      </Provider>
    </>
  );
}

const OpenURLButton = ({ phoneNumber, children }) => {
  return (
    <TouchableOpacity
      className='w-full h-full rounded-full flex items-center justify-center'
      onPress={() => openLink(`tel:${phoneNumber}`)}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatButtonContainer: {
    position: 'absolute',
    bottom: Platform.OS == 'android' ? 82 : 100,
    right: 8,
    width: 50,
    height: 50,
    borderRadius: 9999,
    backgroundColor: 'rgba( 255, 0, 0, 0.6)',
  },
});
