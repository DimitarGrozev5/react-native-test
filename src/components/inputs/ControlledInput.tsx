import React from 'react';
import {
  Path,
  Control,
  Controller,
  FieldError,
  FieldValues,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import { Colors } from '../../global-styling';
import AccentText from '../views/AccentText';

type Props<T extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<T, any>;
  name: Path<UnPackAsyncDefaultValues<T>>;
  errors: FieldError | undefined;
  hidden?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  textStyle?: TextStyle;
  rules?: React.ComponentProps<typeof Controller>['rules'];
  placeholder?: string;
  label?: string;
};

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  errors,
  hidden = false,
  inputStyle = {},
  textStyle = {},
  rules = {},
  placeholder = '',
  label = '',
}: Props<T>) => {
  return (
    <View style={styles.container}>
      {!!label && <AccentText>{label}</AccentText>}
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, inputStyle, errors ? styles.inputError : {}]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={hidden}
            placeholder={placeholder}
          />
        )}
        name={name}
      />
      {errors && (
        <Text style={[styles.error, textStyle]}>{errors.message}</Text>
      )}
    </View>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary600,
    borderRadius: 8,
    backgroundColor: Colors.primary300,
    paddingVertical: 4,
    paddingHorizontal: 12,
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
