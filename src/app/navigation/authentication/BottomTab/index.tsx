import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {APP_SCREEN, BottomTabParamsList} from '@navigation/screen-type';
import {ViewStyle} from 'react-native';
import BottomBar from './BottomBar';
import Home from '@features/authentication/BottomTab/Home';
import Endow from '@features/authentication/BottomTab/Endow';
import ServiceScreen from '@features/authentication/BottomTab/Service';
import UserInforScreen from '@features/authentication/BottomTab/UserInfor';

type Props = {};

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const BottomTab = (props: Props) => {
  return (
    <View style={styles.root}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => <BottomBar {...props} />}>
        <Tab.Screen name={APP_SCREEN.HOME} component={Home} />
        <Tab.Screen name={APP_SCREEN.ENDOW} component={Endow} />
        <Tab.Screen name={APP_SCREEN.SERVICE} component={ServiceScreen} />
        <Tab.Screen name={APP_SCREEN.USER_INFOR} component={UserInforScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  } as ViewStyle,
});
