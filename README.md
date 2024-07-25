
# Intro
   ***List features of the project***: 
   1. Show list room call 
   2. Need a passcode to join Room Call
   3. Video call: 1 - 1 (Person)
   4. Video call: 1 - n (Person)
   5. Mute camera
   6. Mute mic
   7. Mute remote user camera
   8. Mute remote user mic

# Example
## Go to the link below to see:
   [https://drive.google.com/drive/folders/1NNzc641uhk26Y8MhbvLmHFolD7_e-XdL?usp=sharing](https://drive.google.com/drive/folders/1NNzc641uhk26Y8MhbvLmHFolD7_e-XdL?usp=sharing)

## Video Demo:
   iOS: [https://drive.google.com/file/d/1Rbk8XETdOrYrVDjELVM57nvu6SALeNR5/view?usp=sharing](https://drive.google.com/file/d/1Rbk8XETdOrYrVDjELVM57nvu6SALeNR5/view?usp=sharing)
   
   Android: [https://drive.google.com/file/d/1eoD37HDy62xL1lIvXYwnFKRXWU7ad7XV/view?usp=sharing](https://drive.google.com/file/d/1eoD37HDy62xL1lIvXYwnFKRXWU7ad7XV/view?usp=sharing)

# Guideline

First, could you please clone the project? To do so, you need to run these commands:
### 1. Clone the project
```sh
git clone https://github.com/lvthong312/AgoraVideoCall.git
```

### 2. Then, you must install the new dependencies in your React Native project. To do so, you need to run these commands

```sh
npm install
```
### 3. Check the environment for Android and iOS
#### IOS: in your project, go to ios/VideoCall/Info.plist and add
```sh
	<key>NSCameraUsageDescription</key>
	<string>Camera</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>Micro</string>
```
#### Android: in your project, go to android/app/src/AndroidManifest.xml and add
```sh
    <uses-permission android:name="android.permission.INTERNET" /> 
    <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <!-- The Agora SDK requires Bluetooth permissions in case users are using Bluetooth devices. -->
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <!-- For Android 12 and above devices, the following permission is also required. -->
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
```
### 4. (Important!): Add your Agora APP_ID
```sh
AgoraVideoCall
│
├── src
│   └── screens
│   │   └── HomePage.tsx
│   │   └── VideoCall.tsx
│   └── ...
└── .env
│
└── ....  
```

Go to the project find the ***.env*** file and update ***APP_ID =[YOUR_APP_ID]***

> ***OR***

> If Android has a black screen, you can go to ***src/screens/VideoCall.tsx*** set directly ***YOUR_APP_ID*** but it's not secure

>  const connectionData: any = {
    appId: ***[YOUR_APP_ID]***,
    channel: props?.item?.channel,
  };

### 5. How to get APP_ID
> [!Note]

> If you haven't APP_ID yet. Please follow the steps below: 

> Step 1: Register an account in [https://www.agora.io/en/](https://www.agora.io/en/)

> Step 2: Go to the Console page of Agora: [https://console.agora.io/](https://console.agora.io/)

> Step 3: click the tab ProjectManagement and copy APP_ID in your project. If you don't have a project let click Create a Project 

<img width="1420" alt="image" src="https://github.com/user-attachments/assets/0be2ce96-4fe3-442c-ac99-d26fd485682f">

### 6. Run your application
#### For IOS
```sh
1. cd ios && pod install && cd ..
```
```sh
2. npx react-native run-ios
```

#### For Android
```sh
npx react-native run-android
```


> [!Note]
> If you haven't set up the React Native environment before. Please see the documentation: [https://reactnative.dev/docs/set-up-your-environment](https://reactnative.dev/docs/set-up-your-environment)

> to see Agora documentation: [https://docs.agora.io/en/video-calling/get-started/get-started-sdk?platform=react-native](https://docs.agora.io/en/video-calling/get-started/get-started-sdk?platform=react-native)






