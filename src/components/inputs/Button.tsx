import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../global-styling';

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
  return (
    <View
      style={[
        style,
        styles.container,
        ...addPlain(plain, styles.plainContainer),
      ]}
    >
      <Pressable
        style={[styles.pressable, ...addPlain(plain, styles.plainPressable)]}
        onPress={onPress}
        android_ripple={{ color: Colors.primary700 }}
      >
        <Text style={[styles.text, ...addPlain(plain, styles.plainText)]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default StyledButton;

const addPlain = <T extends ViewStyle | TextStyle>(
  plain: boolean,
  style: T
): T[] => {
  if (plain) {
    return [style];
  }
  return [];
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    margin: 4,
  },
  pressable: {
    backgroundColor: Colors.primary600,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    color: Colors.primary300,
    textAlign: 'center',
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
    color: Colors.primary700,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primary700,
  },
});
