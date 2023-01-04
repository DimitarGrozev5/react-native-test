import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  useWindowDimensions,
} from 'react-native';
import { BarCodePoint, BarCodeScanner } from 'expo-barcode-scanner';
import { BarCodeScanningResult, Camera, CameraType } from 'expo-camera';

import AppLayout from '../components/app-layout';
import Card from '../components/views/Card';
import { LightColors } from '../global-styling';
import CenteredText from '../components/views/CenteredText';
import AccentText from '../components/views/AccentText';
import WebView from 'react-native-webview';

const center = (res: BarCodeScanningResult) => {
  const [sumX, sumY] = res.cornerPoints.reduce(
    ([sX, sY], pt) => {
      return [sX + pt.x, sY + pt.y];
    },
    [0, 0]
  );

  return { x: sumX / 4, y: sumY / 4 };
};

const dist = (res: BarCodeScanningResult) => {
  return Math.max(
    Math.sqrt(
      (res.cornerPoints[0].x - res.cornerPoints[1].x) ** 2 +
        (res.cornerPoints[0].y - res.cornerPoints[1].y) ** 2
    ),
    Math.sqrt(
      (res.cornerPoints[0].x - res.cornerPoints[3].x) ** 2 +
        (res.cornerPoints[0].y - res.cornerPoints[3].y) ** 2
    )
  );
};

const ViewScreen = () => {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);

  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  const [scanResult, setScanResult] = useState<BarCodeScanningResult | null>(
    null
  );

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

  const handleBarCodeScanned = (results: BarCodeScanningResult) => {
    setScanResult(results);
    console.log(results.cornerPoints);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
                  top: 0, //scanResult.cornerPoints[3].y,
                  left: 0, //scanResult.cornerPoints[3].x,
                  transform: [
                    { translateX: center(scanResult).x - 250 },
                    { translateY: center(scanResult).y - 250 },
                    {
                      rotate: `${Math.atan2(
                        scanResult.cornerPoints[1].y -
                          scanResult.cornerPoints[2].y,
                        scanResult.cornerPoints[1].x -
                          scanResult.cornerPoints[2].x
                      )}rad`,
                    },
                    {
                      scale: dist(scanResult) / 500,
                    },
                  ],
                },
              ]}
            >
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
  camera: { justifyContent: 'center', alignItems: 'center' },
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
  },
});
