import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type Props = React.PropsWithChildren & {};

const TodayOverview: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.accentText, styles.centered]}>
        What's happening today
      </Text>
      <Text style={[styles.centered]}>
        You have spent <Text style={[styles.accentText]}>45min</Text> in
        extension
      </Text>
      <Text style={[styles.centered]}>
        Your goal for today is <Text style={[styles.accentText]}>60min</Text>
      </Text>
      {children}
    </View>
  );
};

export default TodayOverview;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: '#f0c771',
    elevation: 8,
  },
  header: {
    fontSize: 18,
  },
  accentText: {
    color: '#966803',
  },
  centered: {
    textAlign: 'center',
  },
});
