import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { LightColors } from '../../global-styling';

type Props = {
  values: string[];
  onChange: (index: number) => void;
};

const ScrollableSelect: React.FC<Props> = ({ values, onChange }) => {
  const [textHeight, setTextHeight] = useState(10);
  const updateTextHeightHandler = (e: LayoutChangeEvent) => {
    setTextHeight(e.nativeEvent.layout.height);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onChange(Math.round(event.nativeEvent.contentOffset.y / textHeight));
  };

  return (
    <View>
      <View
        style={[styles.mask, styles.headerMask, { height: textHeight }]}
      ></View>
      <ScrollView
        style={[styles.container, { height: textHeight * 3 }]}
        snapToOffsets={values.map((val, i) => i * textHeight)}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        {['', ...values, ''].map((val, i) => (
          <Text
            onLayout={updateTextHeightHandler}
            key={i}
            style={[styles.text]}
          >
            {val}
          </Text>
        ))}
      </ScrollView>
      <View
        style={[styles.mask, styles.footerMask, { height: textHeight }]}
      ></View>
    </View>
  );
};

export default ScrollableSelect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: LightColors.primary300,
    height: 100,
    zIndex: 1,
  },
  text: {
    color: LightColors.primary700,
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 8,
  },
  mask: {
    backgroundColor: 'rgba(242, 211, 143, 0.8)',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
  },
  headerMask: {
    top: 0,
  },
  footerMask: {
    bottom: 0,
  },
});
