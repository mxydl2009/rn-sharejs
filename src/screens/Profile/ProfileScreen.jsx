import { View, Text } from "react-native";
import Login from './Login';
import Profile from './Profile';
import { useSelector } from 'react-redux';

function ProfileScreen() {
  const user = useSelector(state => state.user)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {
        user.username ? 
        <Profile user={user} />:
        <Login />
      }
    </View>
  );
}

export default ProfileScreen;