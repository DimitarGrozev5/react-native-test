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
  selectedValue: string;
  values: string[];
  onChange: (index: string) => void;
};

const getIndex = (offsetY: number, textHeight: number) =>
  Math.round(offsetY / textHeight);

const ScrollableSelect: React.FC<Props> = ({
  selectedValue,
  values,
  onChange,
}) => {
  const selectedIndex = values.indexOf(selectedValue);

  const [textHeight, setTextHeight] = useState(48.380950927734375);
  const updateTextHeightHandler = (e: LayoutChangeEvent) => {
    setTextHeight(e.nativeEvent.layout.height);
  };

  const [internalIndex, setInternalIndex] = useState(-1);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = getIndex(event.nativeEvent.contentOffset.y, textHeight);
    const newValue = values[newIndex];

    onChange(newValue);
    setInternalIndex(newIndex);
  };

  // Controll scroll
  const [ref, setRef] = useState<ScrollView | null>(null);
  const updateScrollPosition = useCallback(() => {
    if (ref) {
      ref.scrollTo({
        x: 0,
        y: (selectedIndex + 1) * textHeight,
        animated: true,
      });
    }
  }, [selectedIndex, ref, textHeight]);

  useEffect(() => {
    if (selectedIndex !== internalIndex && !!ref) {
      updateScrollPosition();
      setInternalIndex(selectedIndex);
    }
  }, [selectedIndex, internalIndex, ref, textHeight, updateScrollPosition]);

  return (
    <View>
      <View
        style={[styles.mask, styles.headerMask, { height: textHeight }]}
      ></View>
      <ScrollView
        style={[styles.container, { height: 150 }]}
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
