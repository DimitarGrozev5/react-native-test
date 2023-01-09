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
  value: number;
  values: string[];
  onChange: (index: number) => void;
};

const ScrollableSelect: React.FC<Props> = ({ value, values, onChange }) => {
  const [textHeight, setTextHeight] = useState(10);
  const updateTextHeightHandler = (e: LayoutChangeEvent) => {
    setTextHeight(e.nativeEvent.layout.height);
  };

  const [momentumLock, setMomentumLock] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onChange(Math.round(event.nativeEvent.contentOffset.y / textHeight));
  };

  // Controll scroll
  const [ref, setRef] = useState<ScrollView | null>(null);
  const updateScrollPosition = () => {
    if (ref && !momentumLock) {
      ref.scrollTo({
        x: 0,
        y: value * textHeight,
        animated: true,
      });
    }
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
        ref={(ref) => {
          setRef(ref);
        }}
        // onScrollBeginDrag={() => setLockOutsideControll(true)}
        onScrollEndDrag={updateScrollPosition}
        onMomentumScrollBegin={() => setMomentumLock(true)}
        onMomentumScrollEnd={updateScrollPosition}
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
