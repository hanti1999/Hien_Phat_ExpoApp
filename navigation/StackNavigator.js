import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ProductsByCategoryScreen from '../screens/ProductsByCategoryScreen';
import ProductByBrandScreen from '../screens/ProductByBrandScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SearchResultList from '../screens/SearchResultList';
import WishlistScreen from '../screens/WishlistScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ThanksScreen from '../screens/ThanksScreen';
import VerifySceen from '../screens/VerifyScreen';
import LoginScreen from '../screens/LoginScreen';
import OrderScreen from '../screens/OrderScreen';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const primaryPink = '#fb77c5';

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Trang chủ',
            headerShown: false,
            tabBarActiveTintColor: primaryPink,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='home' size={24} color={primaryPink} />
              ) : (
                <Ionicons name='home-outline' size={24} color={'#333'} />
              ),
          }}
        />

        <Tab.Screen
          name='Notification'
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Thông báo',
            headerShown: false,
            tabBarActiveTintColor: primaryPink,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='notifications' size={24} color={primaryPink} />
              ) : (
                <Ionicons
                  name='notifications-outline'
                  size={24}
                  color={'#333'}
                />
              ),
          }}
        />

        <Tab.Screen
          name='Cart'
          component={CartScreen}
          options={{
            tabBarLabel: 'Giỏ hàng',
            headerShown: false,
            tabBarActiveTintColor: primaryPink,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='cart' size={24} color={primaryPink} />
              ) : (
                <Ionicons name='cart-outline' size={24} color={'#333'} />
              ),
          }}
        />

        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Tài khoản',
            headerShown: false,
            tabBarActiveTintColor: primaryPink,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='person' size={24} color={primaryPink} />
              ) : (
                <Ionicons name='person-outline' size={24} color={'#333'} />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Verify'
          component={VerifySceen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Main'
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Info'
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Order'
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Thanks'
          component={ThanksScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditProfile'
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProductByCategory'
          component={ProductsByCategoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProductByBrand'
          component={ProductByBrandScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SearchResult'
          component={SearchResultList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Review'
          component={ReviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Wishlist'
          component={WishlistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='About'
          component={AboutScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
