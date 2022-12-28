import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type Props = React.ComponentProps<typeof TextInput>;

/**
 * A COmponent build on top of the native TextInput
 * It uses two TextInputs on top of each other,
 * in order to prevent flicker in controlled inputs
 */
const ControllableTextInput: React.FC<Props> = (props) => {
  const { style, value, onChange, onBlur, ...otherProps } = props;

  const [layout, setLayout] = useState({ height: 0, width: 0, x: 0, y: 0 });
  const positioningHandler = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  };

  return (
    <>
      <TextInput
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={[
          style || {},
          {
            position: 'absolute',
            left: layout.x,
            top: layout.y,
            height: layout.height,
            width: layout.width,
          },
          styles.input,
        ]}
        {...otherProps}
      />
      <TextInput
        value={value}
        style={[style || {}, styles.display]}
        onLayout={positioningHandler}
        pointerEvents={'none'}
        {...otherProps}
      />
    </>
  );
};

export default ControllableTextInput;

const styles = StyleSheet.create({
  input: {
    zIndex: 2,
    color: 'transparent',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  display: {
    zIndex: 1,
  },
});
