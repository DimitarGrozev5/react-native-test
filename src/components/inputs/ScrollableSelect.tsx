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
    borderColor: 'black',
    borderWidth: 1,
    height: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 8,
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  headerMask: {
    top: 0,
  },
  footerMask: {
    bottom: 0,
  },
});
