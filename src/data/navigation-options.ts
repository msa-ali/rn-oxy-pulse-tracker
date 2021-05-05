import {MemberListScreen, MemberStatsScreen} from '../screens';
import OnboardingScreen from '../screens/Onboarding';

export const NavigationOptions = {
  memberList: {
    name: 'member-list',
    component: MemberListScreen,
  },
  memberStats: {
    name: 'member-stats',
    component: MemberStatsScreen,
  },
  onboarding: {
    name: 'onboarding-screen',
    component: OnboardingScreen,
  },
};
