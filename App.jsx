/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/Home/HomeScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import { useTheme, Portal, Modal, ActivityIndicator, Snackbar } from 'react-native-paper';
import { RESOLVED } from './src/store/loading/types';
import { CLEAR } from './src/store/errMsg/types';

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
  const dispatch = useDispatch();
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
            title: 'Home',
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
          options={{ 
            headerShown: true,
            title: 'Profile',
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
