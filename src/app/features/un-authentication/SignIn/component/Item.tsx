import {StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {SvgIconTypes} from '@assets/svgIcon';
import { SvgIcon } from '@components';


type Props = {};
interface ItemType {
  label: string;
  icon: SvgIconTypes;
  id: any;
}

const ListItem = (props: Props) => {
  const listData = React.useRef<ItemType[]>([
    {
      label: 'Mua GSim',
      icon: 'Sim',
      id: '1',
    },
    {
      label: 'Kích hoạt GSim',
      icon: 'ActiveSim',
      id: '2',
    },
    {
      label: 'Điểm giao dịch',
      icon: 'TradeLocation',
      id: '3',
    },
  ]).current;

  return (
    <View style={styles.flexItem as ViewStyle}>
      {listData.map((item, index) => {
        return (
          <TouchableOpacity key={item.id} style={styles.itemView  as ViewStyle }>
            <SvgIcon source={item.icon} size={20} />
            <Text numberOfLines={2} style={styles.textItem as TextStyle } >{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  flexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemView:{
    justifyContent:'center',
    alignItems:'center'
  },
  textItem:{
    maxWidth:70,
    textAlign:'center',
    fontSize:12,
    fontWeight:'400',
    color:'black',
    marginTop:7
  }
});
