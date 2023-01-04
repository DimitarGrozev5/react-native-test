import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';

type Props = {
  children: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  plain?: boolean;
};

const StyledButton: React.FC<Props> = ({
  children,
  onPress,
  style,
  plain = false,
}) => {
  const { pick, switchColors } = useDarkModeStyle();
  return (
    <View style={[style, styles.container, plain ? styles.plainContainer : {}]}>
      <Pressable
        style={[
          styles.pressable,
          pick(styles.pressableDark),
          plain ? styles.plainPressable : {},
        ]}
        onPress={onPress}
        android_ripple={{
          color: switchColors(LightColors.primary700, DarkColors.text),
        }}
      >
        <Text
          style={[
            styles.text,
            pick(styles.textDark),
            plain ? styles.plainText : {},
            plain ? pick(styles.plainTextDark) : {},
          ]}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    margin: 4,
  },
  pressable: {
    backgroundColor: LightColors.primary600,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
  },
  pressableDark: {
    backgroundColor: DarkColors.primary600,
  },
  text: {
    color: LightColors.primary300,
    textAlign: 'center',
  },
  textDark: {
    color: DarkColors.primary300,
  },
  plainContainer: {
    borderRadius: 0,
    margin: 0,
  },
  plainPressable: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingVertical: 4,
    paddingHorizontal: 6,
    elevation: 0,
  },
  plainText: {
    color: LightColors.primary700,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: LightColors.primary700,
  },
  plainTextDark: {
    color: DarkColors.primary700,
    textDecorationColor: DarkColors.primary700,
  },
});
