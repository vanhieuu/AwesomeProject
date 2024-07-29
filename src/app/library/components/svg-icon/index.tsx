

import React, {createElement, memo} from 'react';

import {TouchableOpacity} from 'react-native-gesture-handler';


import {SvgIconProps} from './type';
import { View } from 'react-native';
import { SvgComponent } from '@assets/svgIcon';

const SvgIconComponent = ({
  source,
  color = '#000',
  size = 24,
  colorTheme,
  onPress,
  style,
}: SvgIconProps) => {
  // state
  
  // render
  return onPress ? (
    <TouchableOpacity
      style={style}
      disabled={typeof onPress !== 'function'}
      onPress={onPress}>
      {createElement(SvgComponent[source], {
        width: size,
        height: size,
        fill: colorTheme ? colorTheme : color,
        color: colorTheme ? colorTheme : color,
      })}
    </TouchableOpacity>
  ) : (
    <View style={style}>
      {createElement(SvgComponent[source], {
        width: size,
        height: size,
        fill: colorTheme ? colorTheme : color,
        color: colorTheme ? colorTheme : color,
      })}
    </View>
  );
};

export const SvgIcon = memo(SvgIconComponent);
