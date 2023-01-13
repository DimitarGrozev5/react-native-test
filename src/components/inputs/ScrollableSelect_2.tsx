import React, { useState } from 'react';
import {
  StyleSheet,
  NativeSyntheticEvent,
  View,
  Text,
  Pressable,
  NativeTouchEvent,
} from 'react-native';
import { LightColors } from '../../global-styling';
import { animateState } from '../../util/animate-state';

type Props = {
  selectedValue: string;
  values: string[];
  onChange: (index: string) => void;
};

const valueHeightConst = 48;

const ScrollableSelect_2: React.FC<Props> = ({
  selectedValue,
  values,
  onChange,
}) => {
  const selectedIndex = values.indexOf(selectedValue);

  const [touchStart, setTouchStart] = useState<null | {
    t: number;
    x: number;
    y: number;
    offset: number;
  }>(null);

  const [scrollOffset, setScrollOffset] = useState(0);

  const touchStartHandler = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const t = new Date().getTime();
    const x = e.nativeEvent.pageX;
    const y = e.nativeEvent.pageY;
    setTouchStart({
      t,
      x,
      y,
      offset: scrollOffset,
    });
  };

  const touchMoveHandler = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const y = e.nativeEvent.pageY;

    if (touchStart) {
      const dy = y - touchStart.y;

      let baseOffset = touchStart.offset;

      if (-1 * Math.round((touchStart.offset + dy) / valueHeightConst) < 0) {
        baseOffset = touchStart.offset - values.length * valueHeightConst;
      } else if (
        -1 * Math.round((touchStart.offset + dy) / valueHeightConst) >=
        values.length
      ) {
        baseOffset = touchStart.offset + values.length * valueHeightConst;
      }

      setScrollOffset(baseOffset + dy);
      setTouchStart((base) => (base ? { ...base, offset: baseOffset } : null));
    }
  };

  const touchEndHandler = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const t = new Date().getTime();
    const y = e.nativeEvent.pageY;
    const dt = t - touchStart!.t;
    const dy = y - touchStart!.y;

    const finalSpeed = dy / dt;

    let index = -1 * Math.round(scrollOffset / valueHeightConst);
    const duration = 500;
    let handler: (val: number) => void = setScrollOffset;

    if (touchStart) {
      if (Math.abs(finalSpeed) > 0.8) {
        const run = finalSpeed * duration;
        index = -1 * Math.round((scrollOffset + run) / valueHeightConst);

        let loops = 0;
        handler = (val: number) => {
          const targetIndex =
            -1 *
            Math.round(
              (val - loops * values.length * valueHeightConst) /
                valueHeightConst
            );

          if (targetIndex < 0) {
            loops++;
          } else if (targetIndex >= values.length) {
            loops--;
          }
          // console.log(targetIndex, val, loops);

          setScrollOffset(val - loops * values.length * valueHeightConst);
        };
      }

      animateState(
        scrollOffset,
        -1 * index * valueHeightConst,
        handler,
        () => onChange(values[index/*  + selectedIndex */]),
        duration
      );
      // onChange(values[index]);
    }

    setTouchStart(null);
  };

  return (
    <Pressable
      style={[styles.container]}
      onTouchStart={touchStartHandler}
      onTouchMove={touchMoveHandler}
      onTouchEnd={touchEndHandler}
    >
      <View style={[styles.mask, styles.alphaMask, { top: 0 }]}></View>
      <View style={[styles.mask, { top: 50 }]}></View>
      <View style={[styles.mask, styles.alphaMask, { top: 100 }]}></View>
      {[...values.slice(-2), ...values, ...values.slice(0, 2)].map((v, i) => (
        <Floater
          key={i}
          currentIndex={i}
          value={v}
          selectedIndex={selectedIndex}
          scrollOffset={scrollOffset}
        />
      ))}
    </Pressable>
  );
};

type FloaterProps = {
  currentIndex: number;
  value: string;
  selectedIndex: number;
  scrollOffset: number;
};

const FloaterComponent: React.FC<FloaterProps> = ({
  currentIndex,
  value,
  selectedIndex,
  scrollOffset,
}) => {
  let offset =
    58 + (currentIndex - selectedIndex - 2) * valueHeightConst + scrollOffset;

  if (offset < -1 * valueHeightConst) {
    return null;
    offset = -1 * valueHeightConst;
  } else if (offset > 150 + valueHeightConst) {
    return null;
    offset = 150 + valueHeightConst;
  }

  return (
    <View
      key={currentIndex}
      style={[
        styles.floater,
        {
          top: offset,
          // transform: [
          //   {
          //     translateY:
          //       offset,
          //   },
          // ],
        },
      ]}
    >
      <Text style={styles.floaterText}>{value}</Text>
    </View>
  );
};

const Floater = React.memo(FloaterComponent);

export default ScrollableSelect_2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: LightColors.primary300,
    height: 150,
    zIndex: 1,
    padding: 0,

    overflow: 'hidden',
  },
  floater: {
    position: 'absolute',
    width: '100%',
    padding: 0,
    zIndex: 1,
    // borderWidth: 1,
  },
  floaterText: {
    textAlign: 'center',
    color: LightColors.primary700,
    fontSize: 24,
    padding: 0,
    margin: 0,
  },
  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 50,
    zIndex: 2,
  },
  alphaMask: {
    backgroundColor: 'rgba(242, 211, 143, 0.8)',
  },
});
