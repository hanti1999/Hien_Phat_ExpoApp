import { View, Pressable, Linking, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import StackNavigator from './navigation/StackNavigator';
import { UserContext } from './userContext';
import { store } from './redux/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
          <View style={styles.floatButtonContainer}>
            <OpenURLButton phoneNumber='0975841582'>
              <AntDesign name='phone' size={30} color='white' />
            </OpenURLButton>
          </View>
        </UserContext>
      </Provider>
    </>
  );
}

const OpenURLButton = ({ phoneNumber, children }) => {
  return (
    <Pressable
      className='w-full h-full rounded-full flex items-center justify-center'
      onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatButtonContainer: {
    position: 'absolute',
    bottom: 56,
    right: 8,
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: 'rgba( 251, 119, 197, 0.8)',
  },
});
