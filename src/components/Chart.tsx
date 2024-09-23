import { ComponentType, useEffect, useCallback, useReducer } from 'react';
import { Container, Box, Stack, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Enum, Container as ComponentContainer, ComponentUtilType, ComponentProps } from './types';
import useLocalStorage from 'hooks/useLocalStorage';
import reducer, { INITIAL_CONTEXT_STATE } from './reducer';

import DayMomentSeries from './DayMomentSeries';

export const ChartBox: ComponentContainer = ({children}) => (
  <Container maxWidth={false} disableGutters>
    <Box p={4} sx={{ height: '100vh' }}>
      <Stack alignItems="left" children={children} />
    </Box>
  </Container>
);

export const AddDay: ComponentType<{onAdd: ComponentUtilType.DayAdd}> = ({onAdd}) => (
  <Fab color="primary" style={{ position: 'absolute', right: 20, bottom: 20 }} onClick={onAdd}>
    <AddIcon sx={{ transform: 'scale(1.5)' }} fontSize="inherit" />
  </Fab>
);

export default function Chart(props: ComponentProps.ChartProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_CONTEXT_STATE);

  const { days, momentSeries, controlMoments } = state;

  const [dayStore, saveDays] = useLocalStorage('days', days);
  const [momentSeriesStore, saveMomentSeries] = useLocalStorage('momentSeries', momentSeries);
  const [controlMomentsStore, saveControlMoments] = useLocalStorage('controlMoments', controlMoments);

  type Init = (initSettingId: number, initialValues: Array<any>) => void;

  const init = useCallback<Init>((initSettingId, initialValues) => {
    dispatch({
      type: Enum.Command.INIT,
      payload: {
        setting: initSettingId,
        initialValues: initialValues
      }
    });
  }, []);

  useEffect(() => {
    init(Enum.Settings.DAYS, dayStore);
    init(Enum.Settings.MOMENT_SERIES, momentSeriesStore);
    init(Enum.Settings.CONTROL_MOMENTS, controlMomentsStore);
// eslint-disable-next-line
  }, []);

// eslint-disable-next-line
  useEffect(() => saveDays(days), [days]);

// eslint-disable-next-line
  useEffect(() => saveMomentSeries(momentSeries), [momentSeries]);

// eslint-disable-next-line
  useEffect(() => saveControlMoments(controlMoments), [controlMoments]);

  type Day = typeof dayStore[number];
  type DayChange = (index: number, newValue: Day) => void;

  type Moment = typeof momentSeriesStore[number][number];
  type ControlMoment = typeof controlMomentsStore[number][number];

  type MomentSeriesAdd = (dayIndex: number, value: Moment) => void;
  type MomentSeriesChange = (dayIndex: number, index: number, newValue: Moment) => void;
  type MomentSeriesRemove = (dayIndex: number, index: number) => void;

  const handleDayAdd = useCallback<ComponentUtilType.DayAdd>(() => {
    dispatch({
      type: Enum.Command.ADD,
      payload: {
        setting: Enum.Settings.DAYS,
        opts: {}
      }
    });
  }, []);

  const handleDayChange = useCallback<DayChange>((index, newValue) => {
    dispatch({
      type: Enum.Command.UPDATE,
      payload: {
        setting: Enum.Settings.DAYS,
        opts: {
          index: index,
          newValue: newValue
        }
      }
    });
  }, []);

  const handleMomentSeriesAdd = useCallback<MomentSeriesAdd>((dayIndex, value) => {
    dispatch({
      type: Enum.Command.ADD,
      payload: {
        setting: Enum.Settings.MOMENT_SERIES,
        opts: {
          dayIndex: dayIndex,
          value: value
        }
      }
    });
  }, []);

  const handleMomentSeriesChange = useCallback<MomentSeriesChange>((dayIndex, index, newValue) => {
    dispatch({
      type: Enum.Command.UPDATE,
      payload: {
        setting: Enum.Settings.MOMENT_SERIES,
        opts: {
          dayIndex: dayIndex,
          index: index,
          newValue: newValue
        }
      }
    });
  }, []);

  const handleMomentSeriesRemove = useCallback<MomentSeriesRemove>((dayIndex, index) => {
    dispatch({
      type: Enum.Command.REMOVE,
      payload: {
        setting: Enum.Settings.MOMENT_SERIES,
        opts: {
          dayIndex: dayIndex,
          index: index
        }
      }
    });
  }, []);

  return (
    <ChartBox>
      {dayStore.map((day: Day, dayIndex: number) => (
        <DayMomentSeries key={dayIndex} day={day} momentSeries={momentSeriesStore[dayIndex]}
          onDayChange={(newDay: Day) => handleDayChange(dayIndex, newDay)}
          onMomentSeriesAdd={(newMoment: Moment) => handleMomentSeriesAdd(dayIndex, newMoment)}
          onMomentSeriesChange={(index: number, newMoment: Moment) => handleMomentSeriesChange(dayIndex, index, newMoment)}
          onMomentSeriesRemove={(index: number) => handleMomentSeriesRemove(dayIndex, index)}
        />
      ))}
      <AddDay onAdd={handleDayAdd} />
    </ChartBox>
  );
};
