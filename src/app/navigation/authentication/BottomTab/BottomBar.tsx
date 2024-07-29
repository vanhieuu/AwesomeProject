import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useTransition} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgIcon} from '@components';

type Props = {};

const BottomBar = (props: BottomTabBarProps) => {
  const {navigation, state} = props;
  const [isPending, startEffect] = useTransition();

  const pressNavigator = React.useCallback(
    (curTab: any) => {

      startEffect(() => {
        if (curTab === 0 || curTab === 1 || curTab === 2 || curTab === 3) {
          navigation.emit({
            type: 'tabPress',
            target: state.routes[curTab].name,
            canPreventDefault: true,
          });

          navigation.navigate(state.routes[curTab].name);
        }
      });
    },
    [navigation, state],
  );

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(0)}>
        <View pointerEvents="none">
          {state.index === 0 ? (
            <SvgIcon source="GMBLogo" size={29} />
          ) : (
            <SvgIcon source="HomeIcon" size={29} />
          )}
        </View>
        <Text style={styles.txtItem(state.index, 0)}>Trang chủ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(1)}>
        <View pointerEvents="none">
          {state.index === 1 ? (
            <SvgIcon source="GMBLogo" size={29} />
          ) : (
            <SvgIcon source="EndowIcon" size={29} />
          )}
        </View>
        <Text style={styles.txtItem(state.index, 1)}>Ưu đãi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(2)}>
        <View pointerEvents="none">
          {state.index === 2 ? (
            <SvgIcon source="GMBLogo" size={29} />
          ) : (
            <SvgIcon source="ServiceIcon" size={29} />
          )}
        </View>
        <Text style={styles.txtItem(state.index, 2)}>Dịch vụ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(3)}>
        <View pointerEvents="none">
          {state.index === 3 ? (
            <SvgIcon source="GMBLogo" size={29} />
          ) : (
            <SvgIcon source="UserInforIcon" size={29} />
          )}
        </View>
        <Text style={styles.txtItem(state.index, 3)}>Tôi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '100%',
  } as ViewStyle,
  itemIndicator: {
    height: 3,
    width: '100%',
    // marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  } as ViewStyle,
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  } as ViewStyle,
  txtItem: (index: number, curIndex: number) =>
    ({
      color: index === curIndex ? '#282828' : '#7D7D7D',
      textAlign: 'center',
      fontSize: 10,
      fontWeight: index === curIndex ? 'bold' : '400',
    } as TextStyle),
});
