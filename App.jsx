import React, {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import {requestUserPermission, notiListeners} from './src/utils/notiServices';
import messaging from '@react-native-firebase/messaging';
import {fcmService} from './src/components/firebase/FCMServices';
import {localNotificationService} from './LocalNotificationService';
import Home from './src/screen/Home';

const App = () => {
  useEffect(() => {
    fcmService.subscribeToTopic('All');
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onOpenNotification(data) {
      if (data) {
        console.log('Dataa', data);
        Alert.alert(data?.title, data?.body);
      }
    }
    function onRegister(token) {}

    return () => {
      fcmService.unRegister();
      localNotificationService.unregister();

      // apduServiceListener.remove();
      // cardProvisionListener.remove();
      // replenishListener.remove();
    };
  }, []);
  return <Home />;
};

export default App;
