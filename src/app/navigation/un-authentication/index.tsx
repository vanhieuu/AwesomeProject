import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREEN, UnAuthenParamList} from '@navigation/screen-type';
import Onboarding from '@features/un-authentication/Onboarding';
import SignInScreen from '@features/un-authentication/SignIn';
import ResultAuthen from '@features/un-authentication/ResultAuthen';

const Stack = createNativeStackNavigator<UnAuthenParamList>();
const UnAuthenTicationStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Onboarding} name={APP_SCREEN.ONBOARDING} />
      <Stack.Screen component={SignInScreen} name={APP_SCREEN.SIGN_IN} />
      <Stack.Screen component={ResultAuthen}  name={APP_SCREEN.RESULT_AUTHEN} />
    </Stack.Navigator>
  );
};

export default UnAuthenTicationStack;
