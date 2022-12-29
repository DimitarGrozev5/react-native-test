import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../global-styling';
import AccentText from './AccentText';
import CenteredText from './CenteredText';

type Props = React.PropsWithChildren & {
  header?: string;
  style?: ViewStyle | ViewStyle[];
  expand?: boolean;
  centered?: boolean;
};

const Card: React.FC<Props> = ({
  children,
  header,
  style = {},
  expand = false,
  centered = true,
}) => {
  return (
    <View
      style={[
        styles.container,
        expand ? styles.expand : {},
        centered ? styles.centeredContent : {},
        style,
      ]}
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
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: Colors.primary500,
    elevation: 8,
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
