import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {CustomTab, TabButtonType} from '@model/type';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  selectedTab: CustomTab;
  setSelectedTab: React.Dispatch<React.SetStateAction<CustomTab>>;
  listTab: React.MutableRefObject<TabButtonType[]>;
};

const TabButton = (props: Props) => {
  const [dimension, setDimension] = useState({width: 100, height: 20});
  const buttonWidth = dimension.width / props.listTab.current.length;

  const tabPositionX = useSharedValue(0);

  const handlePress = (index: number) => {
    props.setSelectedTab(String(index+1) as any);
  };

  const onTabPress = (index: number) => {
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabPositionX.value}],
      height: dimension.height - 10,
      width: buttonWidth - 10
    };
  });

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimension({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };
// console.log(buttonWidth,'??')
  return (
    <View accessibilityRole="tab" style={styles.rootButton as any}>
      <Animated.View
        style={[animatedStyle,styles.layoutButton as any]}
      />
      <View onLayout={onTabBarLayout} style={{flexDirection: 'row'}}>
        {props.listTab?.current.map((button, index) => {
          const color = props.selectedTab === button.id ? 'black' : '#545454';
          return (
            <TouchableOpacity
              key={button.id}
              onPress={() => onTabPress(index)}
              style={{
                flex: 1,
                paddingVertical: 20,
                // height: dimension.height,
                // width: buttonWidth,
              }}>
              <Text style={[styles.textButton as any, {color: color}]}>
                {button.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(TabButton);

const styles = StyleSheet.create({
  textButton: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '500',
  },
  rootButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal:8
  } as ViewStyle,
  layoutButton:{
    backgroundColor: '#FFF4D6',
    position: 'absolute',
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth:1,
    borderColor:'#FFD157'
    
  }
});
