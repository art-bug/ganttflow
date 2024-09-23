import { Stack, Divider } from '@mui/material';

import { Container, ComponentProps } from './types';
import Day from './Day';
import MomentSeries from './MomentSeries';

export const DayMomentSeriesBox: Container = ({children}) => (
  <Stack direction="row" spacing={2} children={children}
    alignItems="center"
  />
);

export default function DayMomentSeries(props: ComponentProps.DayMomentSeriesProps) {
  const {
    day,
    momentSeries,
    onDayChange,
    onMomentSeriesAdd,
    onMomentSeriesChange,
    onMomentSeriesRemove
  } = props;

  return (
    <DayMomentSeriesBox>
      <Day value={day} onChange={onDayChange} />
      <Divider orientation="vertical" flexItem />
      <MomentSeries
        values={momentSeries}
        onAdd={onMomentSeriesAdd}
        onChange={onMomentSeriesChange}
        onRemove={onMomentSeriesRemove}
      />
    </DayMomentSeriesBox>
  );
};
