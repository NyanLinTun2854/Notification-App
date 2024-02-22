import React from 'react';
import {Text, View} from 'react-native';
import {useFormContext} from '../context/FormContext';

const About = () => {
  const {control, handleSubmit, getValues, watch} = useFormContext();

  console.log(watch('firstName'));
  return (
    <View>
      <Text>About</Text>
    </View>
  );
};

export default About;
