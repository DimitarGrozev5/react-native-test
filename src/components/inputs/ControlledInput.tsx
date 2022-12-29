import React from 'react';
import {
  Path,
  Control,
  Controller,
  FieldValues,
  UnPackAsyncDefaultValues,
  FieldError,
} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
} from 'react-native';
import { Colors } from '../../global-styling';

type Props<T extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<T, any>;
  name: Path<UnPackAsyncDefaultValues<T>>;
  errors: FieldError | undefined;
  inputStyle?: StyleProp<TextStyle>;
  textStyle?: TextStyle;
};

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  errors,
  inputStyle = {},
  textStyle = {},
}: Props<T>) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, inputStyle, errors ? styles.inputError : {}]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors && (
        <Text style={[styles.error, textStyle]}>{errors.message}</Text>
      )}
    </>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.primary600,
    borderRadius: 8,
    backgroundColor: Colors.primary300,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 8,
    color: Colors.primary700,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
  },
});
