import {OxyPulseDataType} from '../models/member.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    Promise.reject(error);
  }
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null
      ? (JSON.parse(jsonValue) as OxyPulseDataType)
      : null;
  } catch (error) {
    Promise.reject(error);
  }
};

const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys || [];
  } catch (error) {
    Promise.reject(error);
  }
};

const getAllValues = async (keys: Array<string> = []) => {
  try {
    const items = await AsyncStorage.multiGet(keys);
    return items.map(item => (item ? item : '{}')) as Array<string>;
  } catch (error) {
    Promise.reject(error);
  }
};

const getAllData = async () => {
  try {
    const keys = await getAllKeys();
    const values = (await getAllValues(keys)) || [];
    return values.map(value =>
      value[1] ? (JSON.parse(value[1]) as OxyPulseDataType) : null,
    );
  } catch (error) {
    Promise.reject(error);
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    Promise.reject(error);
  }
};

export default {
  storeData,
  getData,
  getAllData,
  getAllKeys,
  getAllValues,
  removeData,
};
