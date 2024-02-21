import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';

const Home = () => {
  async function checkApplicationPermission() {
    if (Platform.OS === 'android') {
      try {
        const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

        if (permission) {
          try {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
          } catch (error) {
            console.log(err);
          }
        }
      } catch (error) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    checkApplicationPermission();
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
