import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { SvgIcon } from '@components'

type Props = {}

const HeaderHome = (props: Props) => {
  return (
    <View style={styles.rootHeader}>
        <View style={styles.containHeader}>
            <View>
            <SvgIcon source='AccountIcon' size={24}  />
            <Text style={styles.textTitleHeader}>Chào, Đăng Thắng</Text>
            </View>
            
        </View>
      <Text>HeaderHome</Text>
    </View>
  )
}

export default React.memo(HeaderHome)

const styles = StyleSheet.create({
    rootHeader:{
        // flex:1,
        backgroundColor:'red',

    } as ViewStyle,
    containHeader:  {
            flexDirection:'row'
    } as ViewStyle,
    textTitleHeader:{
        fontSize:16,
        fontWeight:'500',
        lineHeight:24

    } as TextStyle

})