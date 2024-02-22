// ChildComponent.js
import React, {useEffect} from 'react';
import {Controller} from 'react-hook-form';
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useFormContext} from '../context/FormContext';

const Home = () => {
  const {control, handleSubmit, getValues, watch} = useFormContext();

  const onSubmit = data => {
    console.log(data);
  };

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

  console.log(watch('firstName'));

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="firstName"
        defaultValue=""
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="First Name"
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        defaultValue=""
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Last Name"
          />
        )}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Home;
