import { Duration } from 'luxon';
import DurationPicker from 'react-duration-picker'

import { ComponentProps } from './types';

export default function TimeDuration(props: ComponentProps.TimeDurationProps) {
  const { value = Duration.fromObject({ hours: 0, minutes: 0 }, { locale: 'ru' }) } = props;

  const { hours, minutes } = value;

  return (
    <DurationPicker initialDuration={{ hours: hours, minutes: minutes, seconds: 0 }} />
  );
};
