import { StyleSheet, View, Text } from 'react-native'
import { Card, Divider, Avatar, Button, Snackbar } from 'react-native-paper'
import { logout } from '../../store/login/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const itemStyles = StyleSheet.create({
    itemContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: 20,
    },
    itemText: {
      fontSize: 16
    },
    itemName: {
      width: 50
    },
    itemValue: {
      flex: 1
    }
})
const Item = ({ name, value }) => {

  return (
    <View style={[itemStyles.itemContainer]}>
      <Text style={[itemStyles.itemName, itemStyles.itemText]}>{name}</Text>
      {
        typeof value === 'function' ? 
        value():
        <Text style={[itemStyles.itemValue, itemStyles.itemText]}>{value}</Text>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  page: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
  },
  itemList: {
    display: 'flex',
    rowGap: 30,
    paddingVertical: 30
  }
})

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  // // 响应或者校验的提示信息
  const [ feedbackContent, setFeedbackContent ] = useState('');
  const handleFeedbackContentClose = () => {
    setFeedbackContent('');
  };
  const rightContent = () => {
    return (
      <Button mode='text' onPress={() => {Logout()}}>
        退出
      </Button>
    )
  }
  const Logout = () => {
    return dispatch(logout())
    .then(() => {
      setFeedbackContent('退出成功');
    })
    .catch(() => {
      console.log('退出失败');
      setFeedbackContent('');
    })
  }
  return (
    <View style={[styles.page]}>
      <View style={[styles.container]}>
        <Card mode="outlined">
          <Card.Title title={`${user.username || '' }的名片`} right={rightContent} />
          <Divider />
          <Card.Content>
            <View style={[styles.itemList]}>
              <Item name={'用户名'} value={user.username} />
              <Item name={'邮箱'} value={user.email} />
              {
                user.avatar &&
                <Item name={'头像'} value={() => {
                  return user.avatar ?
                    <Avatar.Image source={{ uri: user.avatar }} size={160} /> :
                    <Avatar.Text label={user.username.charAt(0)} size={120} />
                  }
                } />
              }
            </View>
          </Card.Content>
        </Card>
        <Snackbar visible={feedbackContent !== ''} duration={2000}
            onDismiss={handleFeedbackContentClose}>
              { feedbackContent }
        </Snackbar>
      </View>
    </View>
    
  )
}

export default Profile;