import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../../global-styling';
import { DailyAchievement } from '../../../model/db/db';
import { formatTime } from '../../../util/format-time';
import AccentText from '../../views/AccentText';

type Props = React.PropsWithChildren & {
  today: DailyAchievement;
};

const TodayOverview: React.FC<Props> = ({ children, today }) => {
  const spent = today.achieved;
  const goal = today.goal;

  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.centered]}>
        <AccentText>What&apos;s happening today</AccentText>
      </Text>
      <Text style={[styles.centered]}>
        You have spent <AccentText>{formatTime(spent)}s</AccentText> in
        extension
      </Text>
      <Text style={[styles.centered]}>
        Your goal for today is <AccentText>{formatTime(goal)}s</AccentText>
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
