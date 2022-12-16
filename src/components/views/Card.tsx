import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../global-styling';
import CenteredText from './CenteredText';

type Props = React.PropsWithChildren & {
  header?: string | React.ReactElement;
};

const Card: React.FC<Props> = ({ children, header }) => {
  return (
    <View style={styles.container}>
      {!!header && (
        <CenteredText style={[styles.header, styles.centered]}>
          {header}
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
  header: {
    fontSize: 18,
  },
  centered: {
    textAlign: 'center',
  },
});
