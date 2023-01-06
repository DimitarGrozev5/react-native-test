import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';
import { Seconds } from '../../model/util-types';
import AccentText from '../views/AccentText';
import ScrollableSelect from './ScrollableSelect';

type Props = {
  value: Seconds;
  onChange: (time: Seconds) => void;
};

const DurationPicker: React.FC<Props> = ({ onChange }) => {
  // Set display values for h,m,s
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);

  // When display values change, update onChange handler
  useEffect(() => {
    onChange(Number(h) * 3600 + Number(m) * 60 + Number(s));
  }, [h, m, s, onChange]);

  const { toggle } = useDarkModeStyle();

  const changeHandler = (setter: typeof setH) => (index: number) => {
    setter(index);
  };

  return (
    <View style={[styles.container, toggle(styles.containerDark)]}>
      <View style={styles.inputContainer}>
        <View style={[styles.inputBox, toggle(styles.inputBoxDark)]}>
          {/* <TextInput
            value={h}
            onChange={handleChange(setH)}
            onBlur={blurHandler}
            style={[styles.textInput, toggle(styles.textInputDark)]}
            cursorColor={LightColors.primary700}
            keyboardType="numeric"
          /> */}
          <ScrollableSelect
            values={Array(24)
              .fill('')
              .map((_, i) => i.toString())}
            onChange={changeHandler(setH)}
          />
        </View>
        <View>
          <AccentText>h</AccentText>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.inputBox, toggle(styles.inputBoxDark)]}>
          {/* <ControllableTextInput
            value={m}
            onChange={handleChange(setM)}
            onBlur={blurHandler}
            style={[styles.textInput, toggle(styles.textInputDark)]}
            cursorColor={LightColors.primary700}
          /> */}
          <ScrollableSelect
            values={Array(60)
              .fill('')
              .map((_, i) => i.toString())}
            onChange={changeHandler(setM)}
          />
        </View>
        <View>
          <AccentText>m</AccentText>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.inputBox, toggle(styles.inputBoxDark)]}>
          {/* <ControllableTextInput
            value={s}
            onChange={handleChange(setS)}
            onBlur={blurHandler}
            style={[styles.textInput, toggle(styles.textInputDark)]}
            cursorColor={LightColors.primary700}
          /> */}
          <ScrollableSelect
            values={Array(60)
              .fill('')
              .map((_, i) => i.toString())}
            onChange={changeHandler(setS)}
          />
        </View>
        <View>
          <AccentText>s</AccentText>
        </View>
      </View>
    </View>
  );
};

export default DurationPicker;

const styles = StyleSheet.create({
  container: {
    borderColor: LightColors.primary700,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 16,
    paddingHorizontal: 8,
    margin: 16,
  },
  containerDark: {
    borderColor: DarkColors.primary700,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  inputBox: {
    width: '100%',
    borderBottomColor: LightColors.primary700,
    borderBottomWidth: 1,
  },
  inputBoxDark: {
    borderBottomColor: DarkColors.primary700,
  },
  textInput: {
    textAlign: 'center',
    color: LightColors.primary700,
    padding: 4,
    fontSize: 20,
    backgroundColor: LightColors.primary300,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textInputDark: {
    color: DarkColors.primary700,
    backgroundColor: DarkColors.primary300,
  },
});
