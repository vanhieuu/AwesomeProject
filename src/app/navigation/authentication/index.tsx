import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREEN, AuthenParamList} from '@navigation/screen-type';
import BottomTab from './BottomTab';


const Stack = createNativeStackNavigator<AuthenParamList>();
const Authentication = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={APP_SCREEN.BOTTOM_TAB} component={BottomTab} />
    </Stack.Navigator>
  );
};

export default Authentication;
