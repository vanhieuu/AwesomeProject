import {
  CellRendererProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  VirtualizedList,
} from 'react-native';
import React from 'react';
import Header from './component/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {};

const HomeScreen = (props: Props) => {
  const getItemCount = (data: any): number => 2;

  const cellRender: React.ComponentType<
    CellRendererProps<React.JSX.Element | null | undefined>
  > = React.useCallback(({item}) => item, []);

  const getItem = (data: any, index: number) => {
    switch (index) {
      case 0:
        {
          return <Header />;
        }
      case 1:{
        return(
          <View>
            <Text style={{fontSize:14,color:'#282828'}}>hello from the another side</Text>
          </View>
        )
      }
      

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <VirtualizedList
        data={[]}
        renderItem={() => null}
        getItemCount={getItemCount}
        stickyHeaderIndices={[0]}
        bounces={true}
        decelerationRate={'fast'}
        // ref={visualRef}
        initialScrollIndex={0}
        keyExtractor={(item, index) => index.toString()}
        getItem={getItem}
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="never"
        CellRendererComponent={cellRender}
      
      
      />
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  } as ViewStyle,
});
