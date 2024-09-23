import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { DateTime } from 'luxon';

import { ComponentProps } from './types';
import isText from 'utils/isText';

export default function Time(props: ComponentProps.TimeProps) {
  let { value = '' } = props;

  value = value ? isText(value) ? DateTime.fromISO(value) : value : DateTime.now().plus({ minutes: 1 });

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <TimeField
        slotProps={{ textField: { variant: 'standard' } }}
        InputProps={{ disableUnderline: true }}
        ampm={false}
        readOnly
        defaultValue={value}
      />
    </LocalizationProvider>
  );
};
