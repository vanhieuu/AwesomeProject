import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import json from '@assets/json';
import {navigate} from '@navigation/navigation-service';
import {APP_SCREEN} from '@navigation/screen-type';

type Props = {};
const {width,height} = Dimensions.get('window')

const LottieViewComponent = (props: Props) => {
//   useEffect(() => {}, []);

  return (
    <View style={styles.root}>
      <LottieView
        source={json.splash}
        autoPlay
        loop={false}
        style={styles.lottieStyle}
        speed={2}
        onAnimationFinish={() => navigate(APP_SCREEN.SIGN_IN)}
      />
    </View>
  );
};

export const Splash =   React.memo(LottieViewComponent);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor:'red'
  },
  lottieStyle:{
    width:width,
    height:height
  }
});
