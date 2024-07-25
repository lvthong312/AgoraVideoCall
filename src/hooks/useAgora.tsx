import { PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import createAgoraRtcEngine, { AudienceLatencyLevelType, ChannelProfileType, ClientRoleType, IRtcEngine, RtcSurfaceView } from 'react-native-agora';
import Config from 'react-native-config';
const appId = Config.APP_ID;
const token = null;
const uid = 0; // Local user UID, no need to modify
const useAgora = () => {
    const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
    const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Remote user UID
    const [message, showMessage] = useState(''); // User prompt message
    const [isHost, setIsHost] = useState(true); // User role
    // Initialize the engine when starting the App
    useEffect(() => {
        setupVideoSDKEngine();
    });
    const getPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);
        }
    };
    const setupVideoSDKEngine = async () => {
        try {
            // Create RtcEngine after checking and obtaining device permissions
            if (Platform.OS === 'android') {
                await getPermission();
            }
            agoraEngineRef.current = createAgoraRtcEngine();
            // Register event callbacks
            agoraEngineRef.current.registerEventHandler({
                onJoinChannelSuccess: () => {
                    showMessage('Successfully joined the channel: ');
                    setIsJoined(true);
                },
                onUserJoined: (_connection, Uid) => {
                    showMessage('Remote user ' + Uid + ' has joined');
                    setRemoteUid(Uid);
                },
                onUserOffline: (_connection, Uid) => {
                    showMessage('Remote user ' + Uid + ' has left the channel');
                    setRemoteUid(0);
                },
            });
            // Initialize the engine
            agoraEngineRef.current.initialize({
                appId: appId,
            });
        } catch (e) {
            console.log(e);
        }
    };
    // Define the join method called after clicking the join channel button
    const joinChannel = async (channelName: String) => {
        if (isJoined) {
            return;
        }
        try {
            // Set the channel profile type to live broadcasting after joining the channel
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileLiveBroadcasting,
            );
            // Call the joinChannel method to join the channel
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                // Set the user role to broadcaster
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
                audienceLatencyLevelType: AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency
            });
        } catch (e) {
            console.log(e);
        }
    };
    // Define the leave method called after clicking the leave channel button
    const leaveChannel = () => {
        try {
            // Call the leaveChannel method to leave the channel
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage('Left the channel');
        } catch (e) {
            console.log(e);
        }
    };
    const LocalView = () => {
        if (isJoined) {
            return (
                <React.Fragment key={0}>
                    <RtcSurfaceView canvas={{ uid: 0 }} style={styles.videoView} />
                    <Text>Local user uid: {uid}</Text>
                </React.Fragment>
            )
        }
        return <Text>Join a channel</Text>
    }
    const RemoteView = () => {
        if (isJoined && !isHost && remoteUid !== 0) {
            return (
                <React.Fragment key={remoteUid}>
                    <RtcSurfaceView
                        canvas={{ uid: remoteUid }}
                        style={styles.videoView}
                    />
                    <Text>Remote user uid: {remoteUid}</Text>
                </React.Fragment>
            )
        }
        return (
            <Text>{isJoined && !isHost ? 'Waiting for remote users to join' : ''}</Text>
        )

    }
    const UserView = () => {
        return (
            <SafeAreaView style={styles.main}>
                <Text style={styles.head}>Agora Video SDK Quickstart</Text>
                <View style={styles.btnContainer}>
                    <Text onPress={joinChannel} style={styles.button}>
                        Join channel
                    </Text>
                    <Text onPress={leaveChannel} style={styles.button}>
                        Leave channel
                    </Text>
                </View>
                <View style={styles.btnContainer}>
                    <Text>Audience</Text>
                    <Switch
                        onValueChange={switchValue => {
                            setIsHost(switchValue);
                            if (isJoined) {
                                leaveChannel()
                            }
                        }}
                        value={isHost}
                    />
                    <Text>Host</Text>
                </View>
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContainer}>
                    {LocalView()}
                    {RemoteView()}
                    <Text style={styles.info}>{message}</Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
    return {
        getPermission,
        joinChannel,
        leaveChannel,
        message,
        isJoined,
        remoteUid,
        uid,
        LocalView,
        RemoteView,
        UserView
    }
}
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0055cc',
        margin: 5,
    },
    main: { flex: 1, alignItems: 'center' },
    scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
    scrollContainer: { alignItems: 'center' },
    videoView: { width: '90%', height: 200 },
    btnContainer: { flexDirection: 'row', justifyContent: 'center' },
    head: { fontSize: 20 },
    info: { backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff' }
});
export default useAgora
