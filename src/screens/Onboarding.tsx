import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = () => {
  const backgroundColor = 'rgb(93, 45, 150)';
  const navigator = useNavigation();

  const onCompleteOnboarding = async () => {
    await AsyncStorage.setItem(
      'hasOnboarded',
      JSON.stringify({hasOnboarded: true}),
    );
    navigator.navigate('member-list');
  };
  return (
    <Onboarding
      onDone={onCompleteOnboarding}
      onSkip={onCompleteOnboarding}
      pages={[
        {
          backgroundColor: backgroundColor,
          image: (
            <Image
              source={require('../../assets/pulse.png')}
              style={[styles.image, styles.pulsePng]}
              resizeMode="cover"
            />
          ),
          title: 'Welcome to the Oxy-Pulse Tracker',
          subtitle: "Keep track of your and your family's body vitals",
        },
        {
          backgroundColor: backgroundColor,
          image: (
            <Image
              source={require('../../assets/log.png')}
              style={styles.image}
              resizeMode="cover"
            />
          ),
          title: 'Log Observations',
          subtitle:
            'Log your Oxygen Saturation, Pulse Rate and Body Temperature',
        },
        {
          backgroundColor: backgroundColor,
          image: (
            <Image
              source={require('../../assets/pdf.png')}
              style={styles.image}
              resizeMode="cover"
            />
          ),
          title: 'Share your logs',
          subtitle: 'Share your vital logs as a PDF Document',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {width: 100, height: 100, alignSelf: 'center'},
  pulsePng: {width: 200, height: 200},
});

export default OnboardingScreen;
