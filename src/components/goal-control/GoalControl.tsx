import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useOrientation } from '../../hooks/useIsPortrait';
import { Seconds } from '../../model/util-types';
import { useDBStore } from '../../store-mobx/db/useDBStore';
import { formatTime } from '../../util/format-time';
import StyledButton from '../inputs/Button';
import AccentText from '../views/AccentText';
import Card from '../views/Card';
import CenteredText from '../views/CenteredText';

const GoalControl = () => {
  const goals = useDBStore('goals');
  const { setGoal } = useDBStore('achieved').today;

  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');

  const [newGoal, setNewGoal] = useState<Seconds>(goals.currentDailyGoal);
  const updateGoalHandler = (add: number) => () => {
    setNewGoal((g) => (g + add < 0 ? 0 : g + add));
  };

  const handleSave = () => {
    goals.setCurrentDailyGoal(newGoal);
    setGoal(newGoal);
    setViewMode('view');
  };

  const isLandscape = useOrientation() === 'landscape';
  const { height } = useWindowDimensions();

  return (
    <Card
      header="Managing your goals"
      expand={viewMode === 'view'}
      style={isLandscape ? { width: '50%', height: height - 100 } : {}}
    >
      <CenteredText>
        Your current goal is{' '}
        <AccentText>{formatTime(goals.currentDailyGoal)}s</AccentText>
      </CenteredText>

      {viewMode === 'view' && (
        <StyledButton onPress={() => setViewMode('edit')}>Edit</StyledButton>
      )}
      {viewMode === 'edit' && (
        <>
          <View style={styles.controlContainer}>
            <View style={styles.buttonContainer}>
              <StyledButton
                style={styles.button}
                onPress={updateGoalHandler(-600)}
              >
                -10min
              </StyledButton>
              <StyledButton
                style={styles.button}
                onPress={updateGoalHandler(-60)}
              >
                -1min
              </StyledButton>
              <StyledButton
                style={styles.button}
                onPress={updateGoalHandler(-15)}
              >
                -15sec
              </StyledButton>
            </View>
            <View style={styles.buttonContainer}>
              <CenteredText style={styles.time}>
                {formatTime(newGoal)}s
              </CenteredText>
            </View>
            <View style={styles.buttonContainer}>
              <StyledButton
                style={styles.button}
                onPress={updateGoalHandler(600)}
              >
                +10min
              </StyledButton>
              <StyledButton
                style={styles.button}
                onPress={updateGoalHandler(60)}
              >
                +1min
              </StyledButton>
              <StyledButton
                style={styles.button}
                onPress={updateGoalHandler(15)}
              >
                +15sec
              </StyledButton>
            </View>
          </View>
          <StyledButton onPress={handleSave}>Save</StyledButton>
        </>
      )}
    </Card>
  );
};

export default observer(GoalControl);

const styles = StyleSheet.create({
  controlContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  time: {
    fontSize: 24,
  },
});
