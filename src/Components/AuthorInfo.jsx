import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import { Avatar, Text } from 'react-native-paper';
import { View } from 'react-native';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 16
  },
  avatar: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: -10
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 5,
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: 'gray'
  }
}
/**
 * author: { _id, username, avatar }
 * date: 日期时间
 */
const AuthorInfo = (props) => {
  const user = useSelector(state => state.user);
  const { author, date, size = 48, ...rest } = props;
  return (
    <View style={[styles.container]}>
      <View style={[styles.avatar, { width: size }]}>
        { author.avatar ?
          <Avatar.Image source={{ uri: author.avatar }} size={size} />:
          <Avatar.Text label={author.username? author.username.charAt(0): '无'} size={size} />
        }
        <View style={[styles.icon]}>
        {/* <Avatar.Icon size={24} icon="check-circle" /> */}
          {(user._id !== author._id && user.username) ? 
            ((user.concerns && user.concerns.some(item => item._id === author._id))
            ? 
              <Avatar.Icon size={20} icon="heart" />
              : 
              <Avatar.Icon size={20} icon="heart-broken" />
            )
            : null
          }
        </View>
      </View>
      <View style={[styles.info]}>
        <Text style={[styles.text]}>{author.username}</Text>
        {date ? 
          <Text style={[styles.text]}>
            {dayjs(date).format('YYYY/MM/DD')}
          </Text>: null
        }
      </View>
    </View>
  )
}

export default AuthorInfo;