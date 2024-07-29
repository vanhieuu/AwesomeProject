import {
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState, useTransition} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {formatPhoneNumber} from '@config/function';
import moment from 'moment';

import {navigate} from '@navigation/navigation-service';
import {APP_SCREEN} from '@navigation/screen-type';
import {useIsFocused} from '@react-navigation/native';
import {ScreenModalTab} from '@model/type';
import {CountDown} from '@components';
type Props = {
  phoneNumber: any;
  setParams: React.Dispatch<
    React.SetStateAction<{
      screen: ScreenModalTab;
      value: string;
    }>
  >;
};

const OTPScreen = (props: Props) => {
  const [value, setValue] = React.useState<string>('');
  const OTPref = useBlurOnFulfill({value, cellCount: 6});
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState(false);
  const [expire_time, setExpireTime] = React.useState(
    moment(moment(new Date()).add(1, 'minutes'), 'YYYY-MM-DD HH:mm:ss').unix() -
      moment().unix(),
  );
  const isFocus = useIsFocused();

  const autoComplete = Platform.select({
    android: 'sms-otp',
    default: 'one-time-code',
  });

  const onChangeText = (text: string) => {
    startTransition(() => {
      setValue(text);
    });
  };

  const focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
      OTPref?.current?.focus();
    });
  };
  const onConfirmValue = React.useCallback(
    (value: string) => {
      if (value === '999999' || value === '888888') {
        startTransition(() => {
          navigate(APP_SCREEN.RESULT_AUTHEN, {
            value: value,
          });
          setValue('');
          setIsError(false);
          props.setParams({
            screen: ScreenModalTab.INPUT,
            value: '',
          });
        });
      } else if (value === '777777') {
        startTransition(() => {
          navigate(APP_SCREEN.AUTHENTICATION, {
            screen: APP_SCREEN.BOTTOM_TAB,
            params: {
              screen: APP_SCREEN.HOME,
            },
          });
          setValue('');
          setIsError(false);
          props.setParams({
            screen: ScreenModalTab.INPUT,
            value: '',
          });
        });
      } else {
        setIsError(true);
      }
    },
    [value],
  );

  React.useEffect(() => {
    if (!isError) {
      return;
    } else {
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  }, [isError]);

  React.useEffect(() => {
    focusInputWithKeyboard();
  }, [isFocus]);

  const renderCountDown = () => {
    let countdown =
      moment(
        moment(new Date()).add(1, 'minutes'),
        'YYYY-MM-DD HH:mm:ss',
      ).unix() - moment().unix();

    if ((expire_time && countdown) > 0) {
      return (
        <View style={styles.containCountdown}>
          <Text style={{color: '#A8A8A8', fontSize: 14}}>Gửi lại (</Text>
          <CountDown
            until={countdown}
            size={14}
            onFinish={() => {
              setExpireTime(0);
            }}
            digitStyle={{backgroundColor: 'transparent'}}
            separatorStyle={{color: '#D4d4d4'}}
            style={{paddingHorizontal: 0}}
            digitTxtStyle={styles.digitTxtStyle as any}
            timeToShow={['S']}
            timeLabels={{s: ''}}
            showSeparator
          />
          <Text style={{color: '#A8A8A8'}}>s)</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.resendButton} onPress={() => {}}>
            <View>
              <Text style={styles.sendOTPAgainText}>{'Gửi lại mã OTP'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.containTitleText}>
      <Text style={styles.titleText}>
        Nhập mã xác nhận gồm 6 chữ số mà Gmobile gửi đến{' '}
        {formatPhoneNumber(props.phoneNumber)}
      </Text>
      <CodeField
        ref={OTPref}
        {...codeFieldProps}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={onChangeText}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={autoComplete as any}
        // testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[
              styles.cell,
              isFocused && styles.focusCell,
              {
                color: isError ? '#FF5F57' : '#4788FF',
                borderColor: isError ? '#FF5F57' : '#4788FF',
              },
            ]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {isError && (
        <View style={{marginTop: 8, marginHorizontal: 20}}>
          <Text style={{fontSize: 12, fontWeight: '400', color: '#FF5F57'}}>
            Mã lỗi tương ứng
          </Text>
        </View>
      )}
      <View style={styles.containButton}>
        {renderCountDown()}
        <TouchableOpacity
          style={styles.confirmButton(value.length)}
          onPress={() => onConfirmValue(value)}
          disabled={value.length < 6}>
          <Text
            style={{
              fontSize: 16,
              color: value.length < 6 ? 'white' : '#282828',
              fontWeight: '500',
            }}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(OTPScreen);

const styles = StyleSheet.create({
  containTitleText: {
    justifyContent: 'center',
  } as ViewStyle,
  titleText: {
    fontSize: 16,
    color: '#282828',
    paddingHorizontal: 20,
  } as TextStyle,
  cell: {
    width: 45,
    height: 45,
    lineHeight: 50,
    fontSize: 22,
    fontWeight: 'bold',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#D4D4D4',
    textAlign: 'center',
    color: '#4788FF',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical:4
  } as TextStyle,
  focusCell: {
    borderColor: '#4788FF',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf:'center'
  } as any,
  codeFieldRoot: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  } as ViewStyle,
  containButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 8,
  } as ViewStyle,
  resendButton: {
    borderColor: '#D4D4D4',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 30,
    flex: 1,
    marginHorizontal: 8,
  } as ViewStyle,
  digitTxtStyle: {
    color: '#A8A8A8',

    fontSize: 14,
    paddingHorizontal: 0,
  } as TextStyle,
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  sendOTPAgainText: {
    textDecorationColor: '#282828',
    // textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
    color: '#282828',
  } as TextStyle,
  confirmButton: (length: number) =>
    ({
      flex: 1,
      borderRadius: 8,
      backgroundColor: length < 6 ? '#d4d4d4' : '#FFD157',
      paddingVertical: 13,
      paddingHorizontal: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
    } as ViewStyle),
  containCountdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#D4d4d4',
    borderWidth: 1,
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 50,
    alignItems: 'center',
  } as ViewStyle,
});
