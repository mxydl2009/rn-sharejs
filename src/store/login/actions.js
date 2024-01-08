import { LOGIN, LOGOUT } from './types';
import { 
  requestGetUser, 
  requestLogin, 
  requestLogout, 
  requestUpdateUser, 
  requestUserSignup
} from '../../utils/request';
import storage from '../../utils/Storage';

// 登录，服务端下发token，客户端存储用户信息
export const login = (payload) => (dispatch) => {
  return requestLogin({
    ...payload
  })
  .then(async res => {
    if (res.success) {
      await storage.set('token', res.data.token);
      return dispatch({
        type: LOGIN,
        payload: res.data.userInfo
      })
    }
    return Promise.reject({
      message: res.message
    })
  })
}

// 登出，客户端清除storage的token，redux的用户信息
export const logout = () => (dispatch) => {
  return requestLogout()
  .then(async res => {
    if (res.success) {
      console.log('logout success');
      await storage.remove('token');
      return dispatch({
        type: LOGOUT
      })
    }
    throw new Error(res.data.message)
  })
}

export const signup = (payload) => (dispatch) => {
  console.log('signup action', payload);
  return requestUserSignup({
    ...payload
  })
  .then(res => {
    console.log('signup: ',  res.success);
    if (res.success) {
      console.log('signup success', res.success);
      return dispatch({
        type: LOGIN,
        payload: res.data.userInfo
      })
    }
    return Promise.reject({
      message: res.data.message
    })
  })
}

export const getUserInfo = () => dispatch => {
    return requestGetUser()
    .then(res => {
      console.log('getUserInfo: ', res)
      if (res.success) {
        return dispatch({
          type: LOGIN,
          payload: res.data.userInfo
        })
      }
      return Promise.reject({
        message: res.data.message
      })
    })
  // }
}

export const editUserInfo = (payload) => dispatch => {
  return requestUpdateUser({
    ...payload
  })
    .then(res => {
      console.log('edit UserInfo: ', res)
      if (res.success) {
        return dispatch({
          type: LOGIN,
          payload: res.data.userInfo
        })
      }
      return Promise.reject({
        message: res.data.message
      })
    })
}