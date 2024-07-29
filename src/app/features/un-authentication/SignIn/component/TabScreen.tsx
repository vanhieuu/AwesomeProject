import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef, useState, useTransition} from 'react';
import {CustomTab, TabButtonType} from '@model/type';
import TabButton from './TabButton';
import {Img, SvgIcon} from '@components';
import {ImageStyle} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

type Props = {
  onPressConfirm: (value: any) => void;
  error: boolean;
};

const TabScreen = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState(CustomTab.PHONE_NUMBER_TAB);
  const ref = useRef<TextInput>(null);
  const [isPending, startEffect] = useTransition();
  const [isFocus, setIsFocus] = useState(ref.current?.isFocused);
  const [isAgree, setIsAgree] = useState(false);
  const [value, setValue] = useState('');
  const tabButton = useRef<TabButtonType[]>([
    {title: 'Bằng số điện thoại', id: '1'},
    {title: 'Bằng 3G/4G', id: '2'},
  ]);
  const [networkState, setNetworkState] = useState<NetInfoState | any>({});

  React.useEffect(() => {
    setIsFocus(ref?.current?.isFocused);
  }, [ref.current?.isFocused]);

  const onChangeValue = (text: string) => {
    startEffect(() => {
      setValue(text);
    });
  };

  React.useLayoutEffect(() => {
    NetInfo.addEventListener(networkState => {
      setNetworkState(networkState);
    });
  }, [selectedTab]);

  const goToSetting = React.useCallback(() =>{
    if (Platform.OS === 'ios') {
      Linking.openURL("App-Prefs:root=General&path=Network");

    } else {
      Linking.sendIntent("android.settings.NETWORK_OPERATOR_SETTINGS");
    }
  },[])


  return (
    <>
      <TabButton
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        listTab={tabButton}
      />
      <View style={{flex: 1, marginHorizontal: 8}}>
        {selectedTab === '1' ? (
          <View style={styles.tabRootScreen}>
            <>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '400'}}>
                Gmobile sẽ gửi mã xác nhận tới số điện này.
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: props.error
                      ? '#FF5F57'
                      : isFocus
                      ? '#4788FF'
                      : '#D4D4D4',
                    color: props.error
                      ? '#FF5F57'
                      : isFocus
                      ? '#4788FF'
                      : '#282828',
                  },
                ]}
                ref={ref}
                value={value}
                placeholder="Nhập số điện thoại"
                placeholderTextColor={'#7D7D7D'}
                keyboardType="number-pad"
                onChangeText={onChangeValue}
                onPressIn={() => setIsFocus(true)}
                onEndEditing={() => {
                  setIsFocus(false);
                  props.onPressConfirm(value);
                }}
              />
              {isFocus && (
                <TouchableOpacity
                  style={styles.buttonClear}
                  onPress={() => setValue('')}>
                  <SvgIcon source={'CloseIcon'} size={20} />
                </TouchableOpacity>
              )}
              {props.error && (
                <View style={{marginVertical: 8}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#FF5F57',
                      fontWeight: '400',
                    }}>
                    Số điện thoại không đúng dịnh dạng
                  </Text>
                </View>
              )}

              <View style={styles.containContentPolicy}>
                <TouchableOpacity
                  style={styles.buttonCheck(isAgree)}
                  onPress={() => {
                    setIsAgree(prev => !prev);
                  }}>
                  {isAgree && (
                    <SvgIcon
                      source="WhiteCheck"
                      size={20}
                      color="transparent"
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.textAgree} numberOfLines={2}>
                  Tôi đồng ý với Điều khoản sử dụng & Chính sách riêng tư của
                  Gmobile.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => props.onPressConfirm(value)}
                style={styles.buttonConfirm(isAgree)}
                disabled={!isAgree}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: isAgree ? 'black' : 'white',
                  }}>
                  Tiếp tục
                </Text>
              </TouchableOpacity>
            </>
          </View>
        ) : (
          <View style={styles.tabRootScreen}>
            <>
              {networkState.isConnected && networkState.type === 'cellular' ? (
                <>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '400'}}>
                    Đăng ký/Đăng nhập chỉ với 1 thao tác khi chọn phương thức
                    bằng 3G/4G.{' '}
                  </Text>
                  <View style={styles.containPic}>
                    <Img
                      source="wifiPic"
                      style={styles.imageStyle}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.containContentPolicy}>
                    <TouchableOpacity
                      style={styles.buttonCheck(isAgree)}
                      onPress={() => {
                        setIsAgree(prev => !prev);
                      }}>
                      {isAgree && (
                        <SvgIcon
                          source="WhiteCheck"
                          size={20}
                          color="transparent"
                        />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.textAgree} numberOfLines={2}>
                      Tôi đồng ý với Điều khoản sử dụng & Chính sách riêng tư
                      của Gmobile.
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.onPressConfirm(value)}
                    style={styles.buttonConfirm(isAgree)}
                    disabled={!isAgree}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: isAgree ? 'black' : 'white',
                      }}>
                      Tiếp tục
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '400'}}>
                    Dữ liệu 3G/4G đang bị tắt. Vui lòng truy cập “Cài đặt" để sử
                    dụng tính năng.
                  </Text>
                  <View style={styles.containPic}>
                    <Img
                      source="wifiPic"
                      style={styles.imageStyle}
                      resizeMode="contain"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={goToSetting}
                    style={styles.buttonConfirm(true)}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color:  'black',
                      }}>
                      Cài đặt ngay
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          </View>
        )}
      </View>
    </>
  );
};

export default React.memo(TabScreen);

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 16,
    borderColor: '#D4D4D4',
    // backgroundColor:'red'
  } as ViewStyle,
  buttonClear: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 50,
  } as ViewStyle,
  containContentPolicy: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    alignContent: 'center',
    // marginHorizontal:11p
    paddingHorizontal: 10,
  } as ViewStyle,
  buttonCheck: (isAgree: boolean) =>
    ({
      width: 24,
      height: 24,
      borderRadius: 8,
      borderWidth: isAgree ? 0 : 1,
      backgroundColor: isAgree ? '#FFD157' : 'white',
      borderColor: isAgree ? 'transparent' : '#A8A8A8',
      marginTop: 8,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      // borderc
    } as ViewStyle),
  textAgree: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginTop: 8,
  } as TextStyle,
  buttonConfirm: (isAgree: boolean) =>
    ({
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      // marginHorizontal: 8,
      backgroundColor: isAgree ? '#FFD157' : '#D4D4D4',
      marginTop: 16,
      borderRadius: 8,
    } as ViewStyle),
  tabRootScreen: {flex: 1, marginHorizontal: 8, marginVertical: 8},
  imageStyle: {
    width: 150,
    height: 100,
  } as ImageStyle,
  containPic: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});
