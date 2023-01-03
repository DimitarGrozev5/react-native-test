import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BarCodeScanningResult, Camera, CameraType } from 'expo-camera';

import AppLayout from '../components/app-layout';
import Card from '../components/views/Card';

const ViewScreen = () => {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);

  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  if (!cameraPermission) {
    // Camera permissions are still loading
    return <AppLayout></AppLayout>;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet
    return (
      <AppLayout>
        <Card>
          <Text style={{ textAlign: 'center' }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestCameraPermission} title="grant permission" />
        </Card>
      </AppLayout>
    );
  }

  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    // setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <AppLayout>
      <Card expand>
        <Camera
          ratio="16:9"
          style={[
            {
              height: height,
              width: '100%',
            },
          ]}
          type={CameraType.back}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={handleBarCodeScanned}
        ></Camera>
      </Card>
    </AppLayout>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({});
