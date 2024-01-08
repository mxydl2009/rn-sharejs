// import { View } from "react-native";
import Profile from './Profile';
import { useSelector } from 'react-redux';
// import LoginScreen from "./LoginScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./Signup";
import Login from "./Login";

const Stack = createNativeStackNavigator();

function ProfileScreen() {
  const user = useSelector(state => state.user)
  return user._id ? 
      <Profile user={user} /> : 
      <>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ title: '登录' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: '注册' }} />
        </Stack.Navigator>
      </>
}

export default ProfileScreen;