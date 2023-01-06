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
import { useOrientation } from '../hooks/useOrientation';
import { center, dist, orient } from '../util/transformation-utils';

const ViewScreen = () => {
  const isPortrait = useOrientation() === 'portrait';

  // Setup camera size
  const [cameraSize, setCameraSize] = useState({ w: 0, h: 0 });
  const layoutChangeHandler = (e: LayoutChangeEvent) => {
    if (isPortrait) {
      let width = e.nativeEvent.layout.width - 30;
      let height = Math.round((width * 16) / 9);

      if (height > e.nativeEvent.layout.height) {
        height = e.nativeEvent.layout.height - 30;
        width = Math.round((height * 9) / 16);
      }
      setCameraSize({ w: width, h: height });
    } else {
      let width = e.nativeEvent.layout.width - 30;
      let height = Math.round((width * 9) / 16);

      if (height > e.nativeEvent.layout.height) {
        height = e.nativeEvent.layout.height - 30;
        width = Math.round((height * 16) / 9);
      }
      setCameraSize({ w: width, h: height });
    }
  };

  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  const [scanResult, setScanResult] = useState<BarCodeScanningResult | null>(
    null
  );

  const navigation = useNavigation();

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

  const handleBarCodeScanned = (results: BarCodeScanningResult) => {
    setScanResult(results);
  };

  const handleNavigate = () => {
    navigation.navigate('WebView', { url: scanResult?.data });
  };

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
          {/* {!scanResult && (
            <View
              style={[{ width: width * 0.6, height: width * 0.6 }, styles.mark]}
            >
              <View style={styles.markUL}></View>
              <View style={styles.markUR}></View>
              <View style={styles.markLR}></View>
              <View style={styles.markLL}></View>
            </View>
          )} */}
          {scanResult && (
            <View
              style={[
                styles.webView,
                /* scanResult
                ? */ {
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
              {/* <CenteredText>
                <AccentText>{scanResult.data}</AccentText>
              </CenteredText> */}
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
  mark: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  markUL: {
    borderWidth: 5,
    borderColor: LightColors.primary500,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 24,
    width: '40%',
    height: '40%',
  },
  markUR: {
    borderWidth: 5,
    borderColor: LightColors.primary500,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 24,
    width: '40%',
    height: '40%',
  },
  markLL: {
    borderWidth: 5,
    borderColor: LightColors.primary500,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 24,
    width: '40%',
    height: '40%',
    marginLeft: '20%',
  },
  markLR: {
    borderWidth: 5,
    borderColor: LightColors.primary500,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 24,
    width: '40%',
    height: '40%',
    marginLeft: '20%',
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
