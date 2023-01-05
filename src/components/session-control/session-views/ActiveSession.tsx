import React, { useCallback, useState } from 'react';

import { Modal, StyleSheet, View } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../../global-styling';
import { Seconds } from '../../../model/util-types';
import { formatTime } from '../../../util/format-time';
import StyledButton from '../../inputs/Button';
import DurationPicker from '../../inputs/DurationPicker';
import AccentText from '../../views/AccentText';
import Card from '../../views/Card';
import CenteredText from '../../views/CenteredText';

type Props = {
  timeSoFar: Seconds;
  timeToGoal: Seconds;
  stopSessionHandler: () => void;
  wrongTimeHandler: (time: Seconds) => void;
};

const ActiveSession: React.FC<Props> = ({
  timeSoFar,
  timeToGoal,
  stopSessionHandler,
  wrongTimeHandler,
}) => {
  const [showModal, setShowModal] = useState(false);

  const [realTime, setRealTime] = useState<Seconds>(0);

  const showModalHandler = () => setShowModal(true);
  const submitWrongTimeHandler = useCallback(() => {
    wrongTimeHandler(realTime);
    setShowModal(false);
  }, [realTime, wrongTimeHandler]);
  const { pick } = useDarkModeStyle();
  return (
    <>
      <StyledButton onPress={stopSessionHandler}>Stop Extension</StyledButton>
      <CenteredText>
        <AccentText>{formatTime(timeSoFar)}s</AccentText> in extension
      </CenteredText>

      {timeToGoal <= 0 ? (
        <CenteredText>Daily Goal Achieved!</CenteredText>
      ) : (
        <CenteredText>
          <AccentText>{formatTime(timeToGoal)}s</AccentText> to daily goal
        </CenteredText>
      )}
      <StyledButton onPress={showModalHandler} plain>
        Wrong time?
      </StyledButton>

      <Modal visible={showModal} animationType="slide">
        <View style={[styles.modalContainer, pick(styles.modalContainerDark)]}>
          <Card style={{ height: '40%', minHeight: 350 }}>
            <View style={styles.modalContent}>
              <CenteredText style={{ fontSize: 18 }}>
                <AccentText>Set actual time</AccentText>
              </CenteredText>
              <DurationPicker value={realTime} onChange={setRealTime} />
            </View>
            <View style={styles.modalButtons}>
              <StyledButton
                onPress={submitWrongTimeHandler}
                style={{ flex: 1 }}
              >
                Set
              </StyledButton>
              <StyledButton
                onPress={() => setShowModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </StyledButton>
            </View>
          </Card>
        </View>
      </Modal>
    </>
  );
};

export default ActiveSession;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: LightColors.primary300,
  },
  modalContainerDark: {
    backgroundColor: DarkColors.primary300,
  },
  modalContent: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
  },
});
