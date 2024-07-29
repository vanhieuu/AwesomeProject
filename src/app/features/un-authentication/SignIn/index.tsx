import {
  ImageBackground,
  ImageStyle,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Img} from '@components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '@assets/images';
import ListItem from './component/Item';
import BannerComponent from './component/Banner';
import {SvgIcon} from '@library/components/svg-icon';
import Modal from 'react-native-modal';
import TabScreen from './component/TabScreen';
import {ScreenModalTab} from '@model/type';
import OTPScreen from './component/OTPScreen';
import {isValidVietnamesePhoneNumber} from '@config/function';

const SignInScreen = () => {
  const [show, setShow] = useState(false);
  const [params, setParams] = useState({
    screen: ScreenModalTab.INPUT,
    value: '',
  });
  const [error, setError] = useState(false);

  const dialCall = React.useCallback((number: any) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  }, []);
  const onBackButton = React.useCallback(() => {
    setShow(false);
    setParams({
      screen: ScreenModalTab.INPUT,
      value: '',
    });
  }, [show]);

  // console.log(params,'???')

  const onPressConfirm = useCallback(
    (value: string) => {
      if (isValidVietnamesePhoneNumber(value.trim())) {
        setParams({
          value: value,
          screen: ScreenModalTab.VERIFY_OTP,
        });
      } else {
        setError(true);
      }
    },
    [error, params.value],
  );

  // console.log(error,'??')

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      return;
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ImageBackground
        source={images.backgroundImage}
        style={[styles.imageBackground]}
        imageStyle={styles.imageBackStyle}>
        <ScrollView style={[styles.root]}>
          <Img
            source="logoMobile"
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <View style={styles.headerView}>
            <Text style={styles.textStyle}>Chúc bạn một ngày tốt lành!</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => setShow(true)}>
              <Text style={styles.textButtonStyle}>Đăng ký/Đăng nhập</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardView}>
            <ListItem />
          </View>

          <BannerComponent />

          <View style={[styles.cardView, {marginBottom: 20}]}>
            <SvgIcon source={'GMBLogo'} size={32} />
            <View style={styles.containFooter}>
              <View style={styles.containTextFooter}>
                <Text style={styles.textTitleHotline}>
                  Tổng đài Gmobile hỗ trợ 24/7
                </Text>
                <Text style={styles.textHotline}>1900 0292</Text>
              </View>
              <TouchableOpacity
                style={styles.containButtonHotline}
                onPress={() => dialCall(String(19000292))}>
                <Text style={styles.textCall}>Gọi</Text>
                <SvgIcon source="CallIcon" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      <Modal
        isVisible={show}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.4}
        // backdropColor='#FFFFFF1B'
        onBackButtonPress={onBackButton}
        style={styles.modalStyle}
        onBackdropPress={onBackButton}>
        <View style={styles.containContentModal(params.screen)}>
          {params.screen === ScreenModalTab.INPUT ? (
            <>
              <View style={styles.containContentHeader}>
                <View style={{alignSelf: 'center', flex: 1}}>
                  <Text style={styles.textHeaderModal}>Đăng ký/Đăng nhập</Text>
                </View>
                <TouchableOpacity onPress={onBackButton}>
                  <SvgIcon source="CloseIcon" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <TabScreen onPressConfirm={onPressConfirm} error={error} />
            </>
          ) : (
            <>
              <View style={styles.containContentHeader}>
                <TouchableOpacity
                  onPress={() => {
                    setParams({
                      screen: ScreenModalTab.INPUT,
                      value: '',
                    });
                  }}>
                  <SvgIcon source="LeftArrow" size={24} color="white" />
                </TouchableOpacity>

                <View style={{flex: 1}}>
                  <Text style={styles.textHeaderModal}> Nhập mã xác nhận </Text>
                </View>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <SvgIcon source="CloseIcon" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <OTPScreen phoneNumber={params.value} setParams={setParams} />
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    // backgroundColor:'red'
  } as ViewStyle,
  imageStyle: {
    width: 120,
    height: 40,
    marginTop: 40,
    marginHorizontal: 20,
    // opacity: 1,
    // position:'absolute'
  } as ImageStyle,
  textStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    lineHeight: 24,
  } as TextStyle,
  textButtonStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    lineHeight: 24,
  } as TextStyle,
  headerView: {
    marginHorizontal: 20,
    justifyContent: 'center',
  } as ViewStyle,
  imageBackground: {
    flex: 1,
    // aspectRatio:0.5
  } as ImageStyle,
  imageBackStyle: {
    opacity: 0.4,
  } as ImageStyle,
  buttonStyle: {
    backgroundColor: '#FFD157',
    borderRadius: 8,
    // justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal:40,
    paddingVertical: 10,
    marginTop: 20,
    // marginRight:40,
    paddingHorizontal: 48,
    alignSelf: 'flex-start',
    marginLeft: 20,
  } as ViewStyle,
  cardView: {
    backgroundColor: '#FFFFFFCC',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 10,

    // opacity:0.7
  } as ViewStyle,
  secondView: {
    marginTop: 16,
  },
  containFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  containTextFooter: {
    marginBottom: 6,
    marginTop: 12,
  } as ViewStyle,
  textTitleHotline: {
    fontSize: 12,
    color: '#7D7D7D',
    fontWeight: '400',
    lineHeight: 15,
  } as TextStyle,
  textHotline: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: 'black',
  } as TextStyle,
  containButtonHotline: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD157',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  } as ViewStyle,
  textCall: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#282828',
    marginRight: 8,
  } as TextStyle,
  modalStyle: {
    marginHorizontal: 0,
    marginVertical: 0,
    justifyContent: 'flex-end',
  } as ViewStyle,
  containContentModal:(screen:ScreenModalTab) =>( {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // flex:1,
    height:  450,
  }) as ViewStyle,
  containContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginHorizontal: 20,
  } as ViewStyle,
  textHeaderModal: {
    fontSize: 16,
    fontWeight: '500',
    color: '#282828',
    textAlign: 'center',
  } as TextStyle,
});
