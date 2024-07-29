import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './navigation-service'
import RootNavigator from './root-navigator'

type Props = {}

const AppNavigator = (props: Props) => {
  return (
    <NavigationContainer  ref={navigationRef} >
        <RootNavigator/>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})