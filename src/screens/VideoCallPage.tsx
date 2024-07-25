import AgoraUIKit from 'agora-rn-uikit';
import React, { useState } from 'react';
import { Text } from 'react-native';
import withNavigation from '../hocs/withNavigation';
import Config from 'react-native-config';
import { IChannel } from '../model/Channel';
import { NavigationProp } from '@react-navigation/native';
interface IProps {
  navigation: NavigationProp<any, any>;
  item: IChannel;
}
const VideoCallPage = (props: IProps) => {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData: any = {
    appId: Config.APP_ID,
    channel: props.item.channel,
  };
  const rtcCallbacks = {
    EndCall: () => props.navigation.goBack(),
  };
  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : (
    <Text onPress={() => setVideoCall(true)}>Start Call</Text>
  );
};

export default withNavigation(VideoCallPage);
