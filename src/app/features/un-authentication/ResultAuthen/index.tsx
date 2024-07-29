import {
  Animated,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {APP_SCREEN, UnAuthenParamList} from '@navigation/screen-type';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Img} from '@components';
import {goBack, navigate} from '@navigation/navigation-service';
import LottieView from 'lottie-react-native';
import json from '@assets/json';

type Props = {};

const ResultAuthen = () => {
  const routeParams =
    useRoute<RouteProp<UnAuthenParamList, APP_SCREEN.RESULT_AUTHEN>>();
  const imageAniValue = React.useRef(new Animated.Value(0)).current;
  const scaleAniValue = React.useRef(new Animated.Value(0)).current;
  //   console.log(routeParams.params, 'params');

  React.useEffect(() => {
    Animated.timing(imageAniValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleAniValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressConfirm = React.useCallback(() => {
    if (routeParams?.params?.value === '888888') {
      goBack();
    } else {
      navigate(APP_SCREEN.AUTHENTICATION, {
        screen: APP_SCREEN.BOTTOM_TAB,
        params: {
          screen: APP_SCREEN.HOME,
        },
      });
    }
  },[]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {routeParams?.params?.value === '999999' ? (
        <View style={styles.containHeader}>
          <Text style={styles.textContain}>Tuyệt vời!</Text>
          <Text style={styles.successText}>
            Đăng ký thành công tài khoản trên ứng dụng Gmobile! Khám phá và trải
            nghiệm ưu đãi đặc biệt chỉ dành riêng cho bạn.
          </Text>
          <View>
            <Img
              source="imageSuccess"
              resizeMode="contain"
              style={[
                styles.imageStyle,
                {opacity: imageAniValue, transform: [{scale: scaleAniValue}]},
              ]}
            />
          </View>
        </View>
      ) : (
        <View style={styles.containHeader}>
          <Text style={styles.textContain}>Đăng ký chưa thành công</Text>
          <Text style={styles.successText}>Mã lỗi tương ứng</Text>
          <View style={{flex: 1}}>
            <LottieView
              source={json.fail}
              autoPlay
              speed={2}
              loop={false}
              style={styles.lottieStyle}
            />
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.buttonStyle} onPress={onPressConfirm}>
        <Text style={styles.textButton}>
          {routeParams?.params?.value === '888888'
            ? 'Thử lại'
            : 'Khám phá ngay'}{' '}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResultAuthen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent:'center',
    // alignItems: 'center',
    marginHorizontal: 20,
  } as ViewStyle,
  textContain: {
    color: '#282828',
    marginTop: 48,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  } as TextStyle,
  containHeader: {
    marginTop: 20,
    // justifyContent:'center',
    alignItems: 'center',
    marginHorizontal: 20,
    flex: 1,
  } as ViewStyle,
  successText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#282828',
    textAlign: 'center',
  } as TextStyle,
  imageStyle: {
    width: 335,
    height: 335,
    marginTop: 16,
  } as ImageStyle,
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 14,
    backgroundColor: '#FFD157',
    borderRadius: 8,
    width: '100%',
  } as ViewStyle,
  textButton: {
    fontSize: 16,
    color: '#282828',
    fontWeight: '400',
  } as TextStyle,
  lottieStyle: {
    width: 150,
    height: 150,
  },
});
