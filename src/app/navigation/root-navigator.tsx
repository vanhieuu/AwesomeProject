import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREEN, RootStackParamList} from './screen-type';
import {SafeAreaView} from 'react-native-safe-area-context';
import UnAuthenTicationStack from './un-authentication';
import Authentication from './authentication';

type Props = {};
const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = (props: Props) => {
  return (
    <SafeAreaView style={styles.root} edges={['bottom', 'top']}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={APP_SCREEN.AUTHENTICATION}
          options={{headerShown: false}}
          component={Authentication}
        />
        <Stack.Screen
          name={APP_SCREEN.UN_AUTHENTICATION}
          options={{headerShown: false}}
          component={UnAuthenTicationStack}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
