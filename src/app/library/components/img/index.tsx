
import React, {memo} from 'react';
import {Animated, Image, View} from 'react-native';


import {styles} from './styles';
import {ImageProps} from './type';
import { images } from '@assets/images';

const ImgComponent = ({
  style: styleOverride,
  resizeMode = 'cover',
  source,
  containerStyle,
}: ImageProps) => {
  // render
  return (
    <View style={containerStyle}>
      <Animated.Image
        style={[styles.img, styleOverride]}
        resizeMode={resizeMode}
        source={images[source ?? 'default'] }
      />
    </View>
  );
};
export const Img = memo(ImgComponent);
