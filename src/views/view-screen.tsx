import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BarCodeScanningResult, Camera, CameraType } from 'expo-camera';

import AppLayout from '../components/app-layout';
import Card from '../components/views/Card';
import { LightColors } from '../global-styling';
import WebView from 'react-native-webview';
import StyledButton from '../components/inputs/Button';
import { useNavigation } from '@react-navigation/native';
import { useIsPortrait } from '../hooks/useIsPortrait';
import { center, dist, orient } from '../util/transformation-utils';
import { useCameraSizeCalculator } from '../components/view-screen/useCameraSize';

const ViewScreen = () => {
  const navigation = useNavigation();
  const isPortrait = useIsPortrait();

  // Handle QR scan results
  const [scanResult, setScanResult] = useState<BarCodeScanningResult | null>(
    null
  );

  const handleBarCodeScanned = (results: BarCodeScanningResult) => {
    setScanResult(results);
  };

  const handleNavigate = () => {
    navigation.navigate('WebView', { url: scanResult?.data });
  };

  // Setup camera size
  const [cameraSize, layoutChangeHandler] = useCameraSizeCalculator();

  // Setup camera permitions
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
        <Card style={{ width: '100%' }}>
          <Text style={{ textAlign: 'center' }}>
            We need your permission to show the camera
          </Text>
          <StyledButton onPress={requestCameraPermission}>
            Grant permission
          </StyledButton>
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Card expand onLayout={layoutChangeHandler} style={{ width: '100%' }}>
        <Camera
          ratio={isPortrait ? '16:9' : '9:16'}
          style={[
            {
              height: cameraSize.h,
              width: cameraSize.w,
            },
            styles.camera,
          ]}
          type={CameraType.back}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={handleBarCodeScanned}
        >
          {scanResult && (
            <View
              style={[
                styles.webView,
                {
                  top: 0,
                  left: 0,
                  transform: [
                    { translateX: center(scanResult).x - 250 },
                    { translateY: center(scanResult).y - 250 },
                    {
                      rotate: `${orient(scanResult)}rad`,
                    },
                    {
                      scale: dist(scanResult) / 500,
                    },
                  ],
                },
              ]}
            >
              <Pressable
                style={[styles.webViewPressable]}
                onPress={handleNavigate}
                android_ripple={{ color: LightColors.primary300 }}
              ></Pressable>
              <WebView
                source={{ uri: scanResult.data }}
                style={{ marginTop: 20 }}
              />
            </View>
          )}
        </Camera>
      </Card>
    </AppLayout>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  camera: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  webView: {
    borderWidth: 1,
    borderColor: LightColors.primary700,
    width: 500,
    height: 500,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: LightColors.primary300,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    zIndex: 5,
  },
  webViewPressable: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 6,
  },
});
