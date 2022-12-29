import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native';
import AppLayout from '../components/app-layout';
import ControlledInput from '../components/inputs/ControlledInput';
import Card from '../components/views/Card';
import CenteredText from '../components/views/CenteredText';

type FormData = {
  email: string;
  repeatEmail: string;
  password: string;
  repeatPassword: string;
};

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      repeatEmail: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <AppLayout>
      <Card>
        <CenteredText>
          Register an account to be able to backup and restore your data and to
          be able to sync other devices
        </CenteredText>
      </Card>
      <Card header="Please input your data" expand>
        <ControlledInput control={control} name="email" errors={errors.email} />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </Card>
    </AppLayout>
  );
};

export default RegisterScreen;
