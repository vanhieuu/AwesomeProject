import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {images} from '@assets/images';
import {Splash} from '@components';

type Props = {};

const OnboardingScreen = (props: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.imageView}>
        <Image
          source={images.logoMobile}
          resizeMode="contain"
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle as any}>
          Ứng dụng viễn thông dành cho người Việt
        </Text>
      </View>
      <Splash />
    </View>
  );
};

export default React.memo(OnboardingScreen);

const styles = StyleSheet.create({
  root: {
    // flex:1,
    // backgroundColor:'red'
  },
  imageView: {
    // backgroundColor: 'red',
    marginHorizontal: 20,
    marginTop: 20,
  },
  imageStyle: {
    width: 100,
    height: 50,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
});
