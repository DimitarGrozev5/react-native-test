import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';

type Props = {
  text1: string;
  text2: string;
  onPressBoth: () => void;
  onPressInner: () => void;
  style?: ViewStyle | ViewStyle[];
};

const DoubleActionButton: React.FC<Props> = ({
  text1,
  text2,
  onPressBoth,
  onPressInner,
  style,
}) => {
  const { pick, switchColors } = useDarkModeStyle();
  return (
    <View style={[style, styles.container]}>
      <Pressable
        style={[styles.pressable, pick(styles.pressableDark)]}
        onPress={onPressBoth}
        android_ripple={{
          color: switchColors(LightColors.primary700, DarkColors.text),
        }}
      >
        <Pressable
          style={styles.leftButton}
          onPress={onPressInner}
          android_ripple={{
            color: switchColors(LightColors.primary700, DarkColors.text),
          }}
        >
          <Text style={[styles.textLeft, pick(styles.textDark)]}>{text1}</Text>
        </Pressable>
        <View style={[styles.rightButton, pick(styles.rightButtonDark)]}>
          <Text style={[styles.textRight, pick(styles.textDark)]}>{text2}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DoubleActionButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    margin: 4,
  },
  pressable: {
    backgroundColor: LightColors.primary600,
    elevation: 2,
    flexDirection: 'row',
  },
  pressableDark: {
    backgroundColor: DarkColors.primary600,
  },
  leftButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 2,
    justifyContent: 'center',
  },
  rightButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftColor: LightColors.primary300,
    borderLeftWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  rightButtonDark: {
    borderLeftColor: DarkColors.primary300,
  },
  textLeft: {
    color: LightColors.primary300,
    textAlign: 'center',
  },
  textRight: {
    color: LightColors.primary300,
    textAlign: 'center',
    fontSize: 10,
  },
  textDark: {
    color: DarkColors.primary300,
  },
});
