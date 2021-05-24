import { Dimensions, Platform } from "react-native";

/**
 * Width of user device
 */
 export const DEVICE_WIDTH: number = (() => Math.round(Dimensions.get('window').width))();

 /**
  * Height of user device
  */
 export const DEVICE_HEIGHT: number = (() => Math.round(Dimensions.get('window').height))();
 
 /**
  * Checks if device OS is ios
  */
 export const isIOS = (): boolean => Platform.OS === 'ios';
 
 /**
  * Checks if device OS is android
  */
 export const isAndroid = (): boolean => Platform.OS === 'android';