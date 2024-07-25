import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IChannel } from '../model/Channel';
interface IProps {
  item: IChannel,
  index: number,
  onPress: Function
}
const ChannelItem = ({ item, index, onPress }: IProps) => {
  const onPressItem = () => {
    onPress();
  }
  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={styles.viewItem}>
      <Image
        style={styles.imageChannel}
        source={{
          uri: item?.image,
        }}
        resizeMode={'cover'}
      />
      <View style={styles.viewJoinCallContainer}>
        <Text style={styles.textJoinCallTitle}>{`[JOIN CALL] `}</Text>
        <Text numberOfLines={3} style={styles.textTitleChannel}>
          {item?.title}
        </Text>
        <Text numberOfLines={3} style={{ fontSize: 14 }}>
          {item?.description}
        </Text>
        <View style={styles.viewUserContainer}>
          <Image
            style={styles.imgUserAvatar}
            source={{
              uri: item?.user?.avatar,
            }}
            resizeMode={'contain'}
          />
          <Text>{item?.user?.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChannelItem;

const styles = StyleSheet.create({
  viewItem: {
    width: '49%',
    borderWidth: 0.5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  imageChannel: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  textTitleChannel: { fontWeight: 'bold', fontSize: 16, height: 40 },
  viewUserContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  imgUserAvatar: { width: 24, height: 24, marginRight: 4, borderRadius: 16 },
  textJoinCallTitle: { color: '#f24',  fontWeight: "bold" },
  viewJoinCallContainer: { paddingVertical: 4, paddingHorizontal: 4 }
});
