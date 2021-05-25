import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,  } from '@react-navigation/drawer';
import { NavigationOptions } from '../data/navigation-options';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
import Schedule from './Schedule';
import { DrawerContent } from '../components/DrawerContent';
import { DEFAULT_COLOR } from '../data/constants';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ScheduleStack = createStackNavigator();

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = React.useState('');
  const { memberList, memberStats, onboarding } = NavigationOptions;
  React.useEffect(() => {
    AsyncStorage.getItem('hasOnboarded').then(value => {
      if (value) {
        setInitialRoute(memberList.name);
      } else {
        setInitialRoute(onboarding.name);
      }
    });
  }, [memberList, onboarding.name]);

  function Home() {
    return <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerTitle: 'Oxy-Pulse Tracker',
        headerTitleStyle: { color: 'rgb(93, 45, 150)' },
        headerTransparent: true,
        headerStyle: { backgroundColor: 'transparent' },
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
  }

  function ScheduleComponent() {
    return <ScheduleStack.Navigator>
      <ScheduleStack.Screen name="Schedule" component={Schedule}  />
    </ScheduleStack.Navigator>;
  }

  return initialRoute ? (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}
      drawerType="back"
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ScheduleScreen" component={ScheduleComponent} />
    </Drawer.Navigator>
  ) : (
    <View style={styles.loadingView}>
      <ActivityIndicator color="rgb(93, 45, 150)" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default AppNavigation;
