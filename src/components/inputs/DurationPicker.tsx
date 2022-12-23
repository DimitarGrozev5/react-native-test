import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { Colors } from '../../global-styling';
import { Seconds } from '../../model/util-types';
import { getHMS } from '../../util/getHMS';
import { leadingZeroes } from '../../util/leading-zeroes';
import AccentText from '../views/AccentText';

type Props = {
  value: Seconds;
  onChange: (time: Seconds) => void;
};

const DurationPicker: React.FC<Props> = ({ value, onChange }) => {
  // Set display values for h,m,s
  const [h, setH] = useState('0');
  const [m, setM] = useState('00');
  const [s, setS] = useState('00');

  // When input text changes, validate input and update display values
  const handleChange =
    (setter: typeof setH) =>
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      event.preventDefault();

      const text = event.nativeEvent.text;
      const notOnlyNumbers = text
        .split('')
        .map((char) =>
          ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)
        )
        .some((isANumber) => isANumber === false);
      if (!notOnlyNumbers) {
        setter(text);
      }
    };
  // When display values change, update onChange handler
  useEffect(() => {
    onChange(Number(h) * 3600 + Number(m) * 60 + Number(s));
  }, [h, m, s, onChange]);

  // On blur, use the value to update the dssplay values
  const blurHandler = useCallback(() => {
    const [hh, mm, ss] = getHMS(value).map((val, i) => {
      if (i === 0) {
        return val.toString();
      }
      return leadingZeroes(val, 2);
    });
    setH(hh);
    setM(mm);
    setS(ss);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            value={h}
            onChange={handleChange(setH)}
            onBlur={blurHandler}
            style={styles.textInput}
            cursorColor={Colors.primary700}
          />
        </View>
        <View>
          <AccentText>h</AccentText>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            value={m}
            onChange={handleChange(setM)}
            onBlur={blurHandler}
            style={styles.textInput}
            cursorColor={Colors.primary700}
          />
        </View>
        <View>
          <AccentText>mm</AccentText>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            value={s}
            onChange={handleChange(setS)}
            onBlur={blurHandler}
            style={styles.textInput}
            cursorColor={Colors.primary700}
          />
        </View>
        <View>
          <AccentText>ss</AccentText>
        </View>
      </View>
    </View>
  );
};

export default DurationPicker;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary700,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 16,
    paddingHorizontal: 8,
    margin: 16,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  inputBox: {
    width: '100%',
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 1,
  },
  textInput: {
    textAlign: 'center',
    color: Colors.primary700,
    padding: 4,
    fontSize: 20,
    backgroundColor: Colors.primary300,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
