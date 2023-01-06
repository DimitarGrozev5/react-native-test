import React from 'react';
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';
import { useOrientation } from '../../hooks/useIsPortrait';
import AccentText from './AccentText';
import CenteredText from './CenteredText';

type Props = React.PropsWithChildren & {
  header?: string;
  style?: ViewStyle | ViewStyle[];
  expand?: boolean;
  centered?: boolean;
  onLayout?: (e: LayoutChangeEvent) => void;
};

const Card: React.FC<Props> = ({
  children,
  header,
  style = {},
  expand = false,
  centered = true,
  onLayout = () => {},
}) => {
  const { toggle } = useDarkModeStyle();
  const isPortrait = useOrientation() === 'portrait';
  return (
    <View
      style={[
        styles.container,
        isPortrait ? styles.containerPortrait : {},
        toggle(styles.containerDark),
        expand ? styles.expand : {},
        centered ? styles.centeredContent : {},
        style,
      ]}
      onLayout={onLayout}
    >
      {!!header && (
        <CenteredText style={[styles.header, styles.centered]}>
          <AccentText>{header}</AccentText>
        </CenteredText>
      )}
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: LightColors.primary500,
    elevation: 8,
  },
  containerPortrait: {
    width: '100%',
  },
  containerDark: {
    backgroundColor: DarkColors.primary500,
  },
  expand: { flex: 1 },
  centeredContent: { justifyContent: 'center' },
  header: {
    fontSize: 18,
  },
  centered: {
    textAlign: 'center',
  },
  content: { flex: 1, justifyContent: 'center' },
});
