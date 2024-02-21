/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage =>
  console.log(
    'received message in background state: ',
    remoteMessage.notification,
  ),
);

// messaging().onNotificationOpenedApp(remoteMessage => {
//   console.log(
//     'Notification opened app from background state: ',
//     remoteMessage.notification,
//   );
// });

// messaging()
//   .getInitialNotification()
//   .then(remoteMessage => {
//     if (remoteMessage) {
//       console.log(
//         'Notification opened app from quit state: ',
//         remoteMessage.notification,
//       );
//     }
//   });

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);
