import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  useWindowDimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BarCodeScanningResult, Camera, CameraType } from 'expo-camera';

import AppLayout from '../components/app-layout';
import Card from '../components/views/Card';
import { Colors } from '../global-styling';

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
            styles.camera,
          ]}
          type={CameraType.back}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={handleBarCodeScanned}
        >
          <View
            style={[{ width: width * 0.6, height: width * 0.6 }, styles.mark]}
          >
            <View style={styles.markUL}></View>
            <View style={styles.markUR}></View>
            <View style={styles.markLR}></View>
            <View style={styles.markLL}></View>
          </View>
        </Camera>
      </Card>
    </AppLayout>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  camera: { justifyContent: 'center', alignItems: 'center' },
  mark: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  markUL: {
    borderWidth: 5,
    borderColor: Colors.primary500,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 24,
    width: '40%',
    height: '40%',
  },
  markUR: {
    borderWidth: 5,
    borderColor: Colors.primary500,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 24,
    width: '40%',
    height: '40%',
  },
  markLL: {
    borderWidth: 5,
    borderColor: Colors.primary500,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 24,
    width: '40%',
    height: '40%',
    marginLeft: '20%',
  },
  markLR: {
    borderWidth: 5,
    borderColor: Colors.primary500,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 24,
    width: '40%',
    height: '40%',
    marginLeft: '20%',
  },
});
