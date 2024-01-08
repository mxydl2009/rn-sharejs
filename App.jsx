/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';
// 当切换tab页时，有时候会出现warning: "Sending 'onAnimatedValueUpdate' with no listeners registered"
LogBox.ignoreAllLogs();

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/Home/HomeScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import { useTheme, Portal, Modal, ActivityIndicator, Snackbar } from 'react-native-paper';
import { RESOLVED } from './src/store/loading/types';
import { CLEAR } from './src/store/errMsg/types';
import { getUserInfo } from './src/store/login/actions';

// function Section({children, title}) {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

function App() {
  const { colors } = useTheme();
  const loading = useSelector(state => state.loading)
  const errMsg = useSelector(state => state.errMsg)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    // 根据Storage中的token获取用户信息，从而判断用户是否已登录
    dispatch(getUserInfo())
    .then()
    .catch((err) => {
      console.log('getUserInfo err', err);
    })
  }, [])
  const hideModal = () => {
    dispatch({
      type: RESOLVED
    })
  }
  const handleErrMsgDismiss = () => {
    dispatch({
      type: CLEAR
    })
  }
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.inactiveColor,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}
          options={{ 
            headerShown: false,
            title: '主页',
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
          options={{ 
            headerShown: user._id ? true : false,
            title: '个人资料',
          }}
        />
      </Tab.Navigator>
      <Portal>
        <Modal visible={loading} onDismiss={hideModal} 
          contentContainerStyle={{
            backgroundColor: 'transparent',
          }}
        >
        <ActivityIndicator animating={loading} color={colors.primary} size="large" />
        </Modal>
      </Portal>
      <Snackbar
        visible={errMsg !== ''}
        onDismiss={handleErrMsgDismiss}
        action={{
          label: 'OK',
          onPress: () => {
            handleErrMsgDismiss();
          },
        }}
        >
          { errMsg }
        </Snackbar>
    </NavigationContainer>
  );
}

export default App;
