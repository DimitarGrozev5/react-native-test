import React from 'react';
import WebView from 'react-native-webview';
import { WebViewScreenProps } from '../../App';
import AppLayout from '../components/app-layout';
import Card from '../components/views/Card';

const WebViewScreen = ({ route }: WebViewScreenProps) => {
  return (
    <>
      <AppLayout>
        <Card expand>
          <WebView
            source={{ uri: route.params.url }}
            style={{ marginTop: 20 }}
          />
        </Card>
      </AppLayout>
    </>
  );
};

export default WebViewScreen;
