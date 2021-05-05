import * as React from 'react';
import {Snackbar} from 'react-native-paper';

export type ToastType = 'Error' | 'Info' | '';

type ToastProps = {
  visible: boolean;
  onDismiss: (...args: any[]) => void;
  type: ToastType;
  message: string;
};

const Toast = ({visible, type, message, onDismiss}: ToastProps) => {
  const toastStyle = {
    backgroundColor: type === 'Error' ? 'red' : 'green',
    zIndex: 100,
  };
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={10000}
      style={toastStyle}>
      {message}
    </Snackbar>
  );
};

export default Toast;
