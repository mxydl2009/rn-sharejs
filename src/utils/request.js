import axios from 'axios'
import storage from './Storage';
import store from '../store';
import { PENDING, RESOLVED } from '../store/loading/types';
import { ERROR } from '../store/errMsg/types';

let loadingCount = 0;

const requestInstance = axios.create({
  baseURL: 'https://sharejs.wiki/api',
  timeout: 5000
});

requestInstance.interceptors.request.use(async (config) => {
  const token = await storage.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

requestInstance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  // error对象经过axios包装，其中response属性里包含了服务端返回的响应主体;
  if (error.response.status === 401) {
    return Promise.reject({
      code: 401,
      message: '当前未登录'
    });
  }
  if (error.response.status === 400) {
    return Promise.reject({
      code: 400,
      message: '请求有误'
    });
  }
  if (error.response.status === 500) {
    return Promise.reject({
      code: 500,
      message: '服务器异常'
    });
  }
})

const request = (config, needGlobalLoading = true) => {
    if (loadingCount === 0 && needGlobalLoading) {
      store.dispatch({
        type: PENDING
      })
    }
    loadingCount ++;

    return requestInstance({
      ...config,
    })
      .then((res) => {
        if (loadingCount === 1 && needGlobalLoading) {
          store.dispatch({
            type: RESOLVED
          })
        }
        loadingCount --;
        
        return res;
      })
      .catch(err => {
        if (loadingCount === 1 && needGlobalLoading) {
          store.dispatch({
            type: RESOLVED
          })
        }
        store.dispatch({
          type: ERROR,
          payload: err.message
        })
        console.log('err', err);
      })
}

request.get = (url, config, needGlobalLoading) => {
  return request({
    method: 'get',
    url,
    ...config,
  }, needGlobalLoading)
}

request.post = (url, data, config, needGlobalLoading) => {
  return request({
    method: 'post',
    url,
    data,
    ...config
  }, needGlobalLoading)
}

request.put = (url, data, config, needGlobalLoading) => {
  return request({
    method: 'put',
    url,
    data,
    ...config
  }, needGlobalLoading)
}

// 用户相关接口
export const requestLogin = (...args) => {
  return request.post('/user/login', ...args);
}

export const requestLogout = (...args) => {
  return request.post('/user/logout', ...args);
}

export const requestGetUser = (...args) => {
  return request.get('/user', ...args);
}

export const requestConcernUser = (...args) => {
  return request.post('/user/concern', ...args);
}

export const requestUpdateUser = (...args) => {
  return request.put('/user', ...args);
}

export const requestUserSignup = (...args) => {
  return request.put('/user/signup', ...args);
}

export const requestGetTempwd = (username, ...args) => {
  return request.get(`/user/${username}/tempwd`, ...args);
}

// 文章相关接口
export const requestArticles = (...args) => {
  return request.post('/posts', ...args);
}

export const requestArticleById = (articleId, userId = '', ...args) => {
  return request.get(`/post/${articleId}`, {
    params: {
      userId
    }
  }, ...args);
}

export const requestDeleteArticleById = (articleId, ...args) => {
  return request.delete(`/post/${articleId}`, ...args);
}

export const requestUpdateArticle = (...args) => {
  return request.put(`/post`, ...args);
}

export const requestCreateArticle = (...args) => {
  return request.post(`/post`, ...args);
}

export const requestLoveArticle = (...args) => {
  return request.post(`/post/love`, ...args);
}

export const requestViewArticle = (...args) => {
  return request.post(`/post/view`, ...args);
}

export const requestTags = (...args) => {
  return request.get(`/tags`, ...args);
}

// 留言和回复相关接口
export const requestRepliesByMsgId = (msgId, ...args) => {
  return request.get(`/msg/${msgId}/replies`, ...args);
}

export const requestAddReply = (...args) => {
  return request.post(`/msg/reply`, ...args);
}

export const requestDeleteReply = (replyId, ...args) => {
  return request.delete(`/msg/reply/${replyId}`, ...args);
}

export const requestAddMsg = (...args) => {
  return request.post(`/msg`, ...args);
}

export const requestDeleteMsgById = (msgId, ...args) => {
  return request.delete(`/msg/${msgId}`, ...args);
}

export const requestGetMsgs = (articleId, ...args) => {
  return request.get(`/msgs/${articleId}`, ...args);
}