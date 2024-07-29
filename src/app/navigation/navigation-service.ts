/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {createRef} from 'react';
import type {NavigationAction} from '@react-navigation/routers';

import {RootStackParamList} from './screen-type';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params?: RootStackParamList[RouteName]]
) {
  navigationRef.current?.navigate(
    arg[0] as any,
    arg.length > 1 ? arg[1] : undefined,
  );
}

export function navigateMerge<RouteName extends keyof RootStackParamList>(
  options: undefined extends RootStackParamList[RouteName]
    ? {
        name: RouteName;
        params?: RootStackParamList[RouteName];
      }
    : {
        name: RouteName;
        params: RootStackParamList[RouteName];
      },
) {
  navigationRef.current?.navigate({
    key: options.name,
    name: options.name,
    params: options.params,
    merge: true,
  } as any);
}

export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack);
}

export function pop(screenCount: number) {
  navigationRef?.current?.dispatch(StackActions.pop(screenCount));
}

export function dispatch(action: NavigationAction) {
  navigationRef.current?.dispatch(action);
}
export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
