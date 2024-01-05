import md5 from 'md5'

// 用户密码使用md5加密后存储
const encrypt = (str) => {
  return md5('sharejs ' + str)
}

export default encrypt;