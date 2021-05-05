import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationOptions} from '../data/navigation-options';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = React.useState('');
  const {memberList, memberStats, onboarding} = NavigationOptions;
  const headerStatusBarHeight = initialRoute === onboarding.name ? 30 : 45;
  React.useEffect(() => {
    AsyncStorage.getItem('hasOnboarded').then(value => {
      if (value) {
        setInitialRoute(memberList.name);
      } else {
        setInitialRoute(onboarding.name);
      }
    });
  }, [memberList, onboarding.name]);

  return initialRoute ? (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerTitle: 'Oxy-Pulse Tracker',
        headerTitleStyle: {color: 'rgb(93, 45, 150)'},
        headerTransparent: true,
        headerStyle: {backgroundColor: 'transparent'},
      }}>
      <Stack.Screen
        name={onboarding.name}
        component={onboarding.component}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={memberList.name}
        component={memberList.component}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name={memberStats.name}
        component={memberStats.component}
        options={{
          title: 'Observations',
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  ) : (
    <View style={styles.loadingView}>
      <ActivityIndicator color="rgb(93, 45, 150)" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default AppNavigation;
