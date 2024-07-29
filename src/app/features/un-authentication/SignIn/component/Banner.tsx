import {
  Animated,
  Dimensions,
  FlatList,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {ImageTypes} from '@assets/images';
import {Img} from '@components';


type Props = {};

interface BannerItem {
  image: ImageTypes;
  content: string;
  label: string;
  id: string;
}
const {width} = Dimensions.get('window');
const ITEM_SIZE = 290;
// const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const BannerComponent = (props: Props) => {
  const ref = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [indexScroll, setIndex] = useState(1);

  

  const listData = useRef<BannerItem[]>([
    {
      image: 'banner',
      label: 'Giảm ngay 20k khi nạp điện thoại trên MyGmobile',
      content: 'Giảm ngay 20k khi nạp điện thoại trên MyGmobile',
      id: '1',
    },
    {
      image: 'banner',
      label: 'Giảm ngay 20k khi nạp điện thoại trên MyGmobile',
      content: 'Giảm ngay 20k khi nạp điện thoại trên MyGmobile',
      id: '2',
    },
    {
      image: 'banner',
      label: 'Giảm ngay 20k khi nạp điện thoại trên MyGmobile',
      content: 'Giảm ngay 20k khi nạp điện thoại trên MyGmobile',
      id: '3',
    },
    {
      image: 'banner',
      label: 'Giảm ngay 20k khi nạp điện thoại trên MyGmobile',
      content: 'Giảm ngay 20k khi nạp điện thoại trên MyGmobile',
      id: '4',
    },
  ]);

  React.useEffect(() => {
    ref.current?.scrollToIndex({
      index: indexScroll > 3 ? 1 : indexScroll,
      viewPosition:0.5,
      animated: true,
    });
  }, [indexScroll]);

  return (
    <View style={styles.cardView}>
      <Text style={styles.textLabel}>Khuyến mại từ Gmobile</Text>
      <Animated.FlatList
        ref={ref}
        initialScrollIndex={1}
        bounces={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        onMomentumScrollEnd={ev => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
          // console.log(index,'index')
          setIndex(index);
        }}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            ref.current?.scrollToIndex({index: info.index, animated: true});
          });
        }}
        data={listData.current}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 10}}
        style={{flexGrow: 0, marginTop: 20}}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
          });
          return (
            <Animated.View style={{width: ITEM_SIZE, opacity}}>
              <Img
                source={item.image}
                style={[styles.imageStyle, {transform: [{scale}], opacity}]}
                resizeMode="contain"
              />
              <View style={styles.containText}>
                <Animated.Text
                  style={[styles.label, {transform: [{scale}], opacity}]}
                  numberOfLines={2}>
                  {item.label}
                </Animated.Text>
                <Animated.Text
                  style={[styles.content, {transform: [{scale}], opacity}]}
                  numberOfLines={1}>
                  {item.content}
                </Animated.Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default React.memo(BannerComponent);

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: 'black',
  } as TextStyle,
  imageStyle: {
    width: ITEM_SIZE,
    height: 160,
  } as ImageStyle,
  containText: {
    marginTop: 20,
    // paddingHorizontal: 8,
    // marginHorizontal:16
  } as ViewStyle,
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    lineHeight: 19,
    // maxWidth:200,
    // textAlign:'center',
    marginHorizontal: 8,
  } as TextStyle,
  content: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
    lineHeight: 15,
    marginHorizontal: 8,
  } as TextStyle,
  cardView: {
    backgroundColor: '#FFFFFFCC',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 10,
    // opacity:0.7
  } as ViewStyle,

});
