import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../global-styling';

type Props = {
  text1: string;
  text2: string;
  onPress1: () => void;
  onPress2: () => void;
  style?: ViewStyle | ViewStyle[];
};

const DoubleActionButton: React.FC<Props> = ({
  text1,
  text2,
  onPress1,
  onPress2,
  style,
}) => {
  return (
    <View style={[style, styles.container]}>
      <Pressable
        style={[styles.pressable]}
        onPress={onPress2}
        android_ripple={{ color: Colors.primary700 }}
      >
        <Pressable
          style={styles.leftButton}
          onPress={onPress1}
          android_ripple={{ color: Colors.primary700 }}
        >
          <Text style={[styles.textLeft]}>{text1}</Text>
        </Pressable>
        <View style={styles.rightButton}>
          <Text style={[styles.textRight]}>{text2}</Text>
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
    backgroundColor: Colors.primary600,
    elevation: 2,
    flexDirection: 'row',
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
    borderLeftColor: Colors.primary300,
    borderLeftWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  textLeft: {
    color: Colors.primary300,
    textAlign: 'center',
  },
  textRight: {
    color: Colors.primary300,
    textAlign: 'center',
    fontSize: 10,
  },
});
