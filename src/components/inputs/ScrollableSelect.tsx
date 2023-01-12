import React, { useCallback, useEffect, useState } from 'react';
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
  index: number;
  values: string[];
  onChange: (index: number) => void;
};

const getIndex = (offsetY: number, textHeight: number) =>
  Math.round(offsetY / textHeight);

const ScrollableSelect: React.FC<Props> = ({ index, values, onChange }) => {
  const [textHeight, setTextHeight] = useState(48.380950927734375);
  const updateTextHeightHandler = (e: LayoutChangeEvent) => {
    setTextHeight(e.nativeEvent.layout.height);
  };

  const [internalIndex, setInternalIndex] = useState(-1);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = getIndex(event.nativeEvent.contentOffset.y, textHeight);
    onChange(newIndex);
    setInternalIndex(newIndex);
  };

  // Controll scroll
  const [ref, setRef] = useState<ScrollView | null>(null);
  const updateScrollPosition = useCallback(() => {
    if (ref) {
      ref.scrollTo({
        x: 0,
        y: index * textHeight,
        animated: true,
      });
    }
  }, [index, ref, textHeight]);

  useEffect(() => {
    if (index !== internalIndex && !!ref) {
      updateScrollPosition();
      setInternalIndex(index);
    }
  }, [index, internalIndex, ref, textHeight, updateScrollPosition]);

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
