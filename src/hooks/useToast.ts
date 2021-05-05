import * as React from 'react';
import {ToastType} from '../components/ui/toast';

const useToast = () => {
  const {useState} = React;
  const [toastText, setToastText] = useState('');
  const [showToast, setShowToast] = useState('' as ToastType);

  const setInfoToast = (info: string) => {
    setShowToast('Info');
    setToastText(info);
  };

  const setErrorToast = (error: string) => {
    setShowToast('Error');
    setToastText(error);
  };

  const hideToast = () => {
    setShowToast('');
    setToastText('');
  };
  return {toastText, showToast, setInfoToast, setErrorToast, hideToast};
};

export default useToast;
