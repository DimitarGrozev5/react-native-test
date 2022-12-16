import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Seconds } from '../../model/util-types';
import { getGoals } from '../../store/db-slice/db-selectors';
import { updateGoalThunk } from '../../store/db-slice/db-thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatTime } from '../../util/format-time';
import StyledButton from '../inputs/Button';
import AccentText from '../views/AccentText';
import Card from '../views/Card';
import CenteredText from '../views/CenteredText';

const GoalControl = () => {
  const dispatch = useAppDispatch();

  const goals = useAppSelector(getGoals());

  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');

  const [newGoal, setNewGoal] = useState<Seconds>(goals.currentDailyGoal);
  const updateGoalHandler = (add: number) => () => {
    setNewGoal((g) => (g + add < 0 ? 0 : g + add));
  };

  const handleSave = () => {
    dispatch(updateGoalThunk(newGoal));
    setViewMode('view');
  };

  return (
    <Card header="Managing your goals" style={{ flex: 1 }}>
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

export default GoalControl;

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
