import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';
import { Seconds } from '../../model/util-types';
import AccentText from '../views/AccentText';
import ScrollableSelect from './ScrollableSelect';
import ScrollableSelect_2 from './ScrollableSelect_2';

type Props = {
  value: Seconds;
  onChange: (time: Seconds) => void;
};

const DurationPicker: React.FC<Props> = ({ onChange }) => {
  // Set values for h,m,s
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);

  // When values change, update onChange handler
  useEffect(() => {
    onChange(Number(h) * 3600 + Number(m) * 60 + Number(s));
  }, [h, m, s, onChange]);

  const changeHandler = (setter: typeof setH) => (index: string) => {
    setter(+index);
  };

  // Handle Dark Mode
  const { toggle } = useDarkModeStyle();

  return (
    <View style={[styles.container, toggle(styles.containerDark)]}>
      <View style={styles.inputContainer}>
        <View style={[styles.inputBox, toggle(styles.inputBoxDark)]}>
          <ScrollableSelect
            selectedValue={h.toString()}
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
          <ScrollableSelect_2
            selectedValue={m.toString()}
            values={Array(60)
              .fill('')
              .map((_, i) => i.toString())}
            onChange={(val) => {
              console.log(val);

              // changeHandler(setM);
            }}
          />
        </View>
        <View>
          <AccentText>m</AccentText>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.inputBox, toggle(styles.inputBoxDark)]}>
          {/* <ScrollableSelect
            selectedValue={s}
            values={Array(60)
              .fill('')
              .map((_, i) => i.toString())}
            onChange={changeHandler(setS)}
          /> */}
        </View>
        <View>
          <AccentText>s</AccentText>
        </View>
      </View>
    </View>
  );
};

export default React.memo(DurationPicker);

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
