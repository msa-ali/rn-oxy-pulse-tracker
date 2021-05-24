import {CommonActions, NavigationContainerRef} from '@react-navigation/native';
let navigator: NavigationContainerRef | null;

export const setNavigator = (nav: NavigationContainerRef | null) => {
  navigator = nav;
};

export const navigate = (routeName: any, params?: any) => {
  navigator && navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
};
