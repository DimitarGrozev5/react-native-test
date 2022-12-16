import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../global-styling';

type Props = {
  children: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
};

const StyledButton: React.FC<Props> = ({ children, onPress, style }) => {
  return (
    <View style={[style, styles.container]}>
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        android_ripple={{ color: Colors.primary700 }}
      >
        <Text style={styles.text}>{children}</Text>
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
    backgroundColor: Colors.primary600,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    color: Colors.primary300,
    textAlign: 'center',
  },
});
