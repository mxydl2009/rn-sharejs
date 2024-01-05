import AsyncStorage from '@react-native-async-storage/async-storage';
class ShareJSStorage {
  constructor() {
    this.storage = 'sharejs';
  }
  async get(key) {
    try {
      const value = await AsyncStorage.getItem(`${this.storage}.${key}`);
      if (key === 'token') {
        return value
      }
      if (typeof value === 'string') {
        console.log('value --- ', value)
        return JSON.parse(value);
      }
    } catch (err) {
      console.log(`get ${key} `, err);
    }
  }
  async set(key, value) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    try {
      await AsyncStorage.setItem(`${this.storage}.${key}`, value);
      return true;
    }
    catch (err) {
      console.log(`set ${key} `, err);
    }
  }
  async remove(key) {
    try {
      await AsyncStorage.removeItem(`${this.storage}.${key}`);
      return true;
    }
    catch (err) {
      console.log(`remove ${key} `, err);
    }
  }
}

const storage = new ShareJSStorage();
export default storage;