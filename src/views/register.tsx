import React from 'react';
import { useForm } from 'react-hook-form';
import AppLayout from '../components/app-layout';
import StyledButton from '../components/inputs/Button';
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
    watch,
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
      <Card header="Please input your data" centered={false}>
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          placeholder="email@domain.com"
          rules={{
            required: 'Email is required',
            pattern: {
              message: 'Please enter a valid email',
              value: /.+@.+\..+/,
            },
          }}
          errors={errors.email}
        />
        <ControlledInput
          control={control}
          name="repeatEmail"
          label="Repeat Email"
          placeholder="email@domain.com"
          rules={{
            required: 'Email is required',
            pattern: {
              message: 'Please enter a valid email',
              value: /.+@.+\..+/,
            },
            validate: (val: string) => {
              if (watch('email') !== val) {
                return "Emails don't match";
              }
            },
          }}
          errors={errors.repeatEmail}
        />
        <ControlledInput
          control={control}
          name="password"
          label="Password"
          rules={{
            required: 'Please enter a password',
            minLength: { value: 6, message: 'Password is too short' },
          }}
          hidden
          errors={errors.password}
        />
        <ControlledInput
          control={control}
          name="repeatPassword"
          label="Repeat Password"
          rules={{
            required: 'Please enter a password',
            minLength: { value: 6, message: 'Password is too short' },
            validate: (val: string) => {
              if (watch('password') !== val) {
                return "Passwords don't match";
              }
            },
          }}
          hidden
          errors={errors.repeatPassword}
        />
        <StyledButton onPress={handleSubmit(onSubmit)}>Submit</StyledButton>
      </Card>
    </AppLayout>
  );
};

export default RegisterScreen;
