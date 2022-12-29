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

type Props<T extends FieldValues> = {
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
            style={[styles.input, inputStyle]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors && (
        <Text style={[styles.error, textStyle]}>This is required.</Text>
      )}
    </>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  input: {},
  error: {},
});
