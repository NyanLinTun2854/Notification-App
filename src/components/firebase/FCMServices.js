import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMServices {
  register = (onRegister, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(onOpenNotification);
  };

  async subscribeToTopic(topic) {
    await messaging()
      .subscribeToTopic(topic)
      .then(() => console.log('Subscribed'));
  }

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = onRegister => {
    console.log('Noti check Permission...');
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // User has permissions
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          console.log('Request Permission');
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log('[FCM Token] token : ', fcmToken);
          onRegister(fcmToken);
        }
      })
      .catch(error => {
        console.log('[FCMService] getToken rejected ', error);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('[FCMService] Request Permission rejected ', error);
      });
  };

  createNotificationListeners = onOpenNotification => {
    this.foregroundMessageListener = messaging().onMessage(
      async remoteMessage => {
        if (remoteMessage) {
          console.log('REMOTE MESSAGE', remoteMessage);
          if (
            remoteMessage?.data?.type == 'MERCHANTTRANSFERCONFIRM' ||
            remoteMessage?.data?.type == 'SHWEOHHLAYAWARD' ||
            remoteMessage?.date?.type == 'AUTHPERSONCONFIRM'
          ) {
          } else {
            const messageData = remoteMessage.notification;
            onOpenNotification(messageData);
          }
        }
      },
    );

    // Triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
      console.log('[FCMService] New token refresh: ', fcmToken);
    });
  };

  subscribe = async topicName => {
    try {
      const topicSubscribeSuccess = await messaging().subscribeToTopic(
        topicName,
      );
    } catch (e) {}
  };

  unRegister = () => {
    this.foregroundMessageListener();
  };
}

export const fcmService = new FCMServices();
