import React from 'react';
import AppLayout from '../components/app-layout';
import Card from '../components/views/Card';
import CenteredText from '../components/views/CenteredText';

const RegisterScreen = () => {
  return (
    <AppLayout>
      <Card header='jdjdh'>
        <CenteredText>
          Register an account to be able to backup and restore your data and to
          be able to sync other devices
        </CenteredText>
      </Card>
    </AppLayout>
  );
};

export default RegisterScreen;
