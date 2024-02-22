import React, {createContext, useContext} from 'react';
import {useForm} from 'react-hook-form';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({children}) => {
  const {control, ...formMethods} = useForm({
    defaultValues: {
      firstName: 'nyan',
      lastName: '',
    },
  });
  return (
    <FormContext.Provider value={{control, ...formMethods}}>
      {children}
    </FormContext.Provider>
  );
};
