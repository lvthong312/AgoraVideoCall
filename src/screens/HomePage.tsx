import { FlatList, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import withNavigation from '../hocs/withNavigation';
import { listChannel } from '../utils/fakeData';
import ChannelItem from '../components/ChannelItem';
import { IChannel } from '../model/Channel';
import { NavigationProp } from '@react-navigation/native';
import PassCode from '../components/PassCode';
interface IProps {
  navigation: NavigationProp<any, any>;
}
const HomePage = (props: IProps) => {

  const refPassCode = useRef()
  const renderItem = useCallback(
    ({ item, index }: { item: IChannel; index: number }) => {
      return (
        <ChannelItem
          item={item}
          index={index}
          onPress={() => {
            if (item?.passCode) {
              refPassCode?.current?.show({
                passCode: item?.passCode,
                item: item
              })
            }
            else {
              props?.navigation?.navigate('VideoCallPage', { item });
            }
          }}
        />
      );
    },
    [],
  );
  const _keyExtractor = (item: IChannel) => `channel${item?.id}`;
  const _onSuccessCallback = (params:  {  item: IChannel}) => {
    props?.navigation?.navigate('VideoCallPage', { item: params?.item });
  }
  return (
    <View>
      <FlatList
        data={listChannel}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.flatlistColumn}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        keyExtractor={_keyExtractor}
      />
      <PassCode ref={refPassCode} onSuccessCallback={_onSuccessCallback} onFailedCallback={undefined} />
    </View>
  );
};

export default withNavigation(HomePage);

const styles = StyleSheet.create({
  flatlistColumn: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
});
