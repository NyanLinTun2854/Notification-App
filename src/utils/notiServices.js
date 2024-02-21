import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, !fcmToken, 'the old token!');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, 'created Token');
      if (fcmToken) {
        console.log(fcmToken, 'new token created');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'error occured at getFcmToken');
    }
  }
};

export const notiListeners = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification opened app from background state: ',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification opened app from quit state: ',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
    console.log('received message in: ', remoteMessage);
  });
};
