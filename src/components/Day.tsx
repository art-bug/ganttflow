import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from 'luxon';

import { ComponentProps } from './types';
import isText from 'utils/isText';

export default function Day(props: ComponentProps.DayProps) {
  let { value = '', onChange } = props;

  value = value ? isText(value) ? DateTime.fromISO(value) : value : DateTime.now();
  
  type Value = typeof value;

  const [day, setDay] = useState<Value>(value);

  const handleChange: typeof onChange = (newValue) => {
    setDay(newValue); onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={day.locale}>
      <DatePicker
        slotProps={{
          textField: {
            variant: 'standard'
          },
          inputAdornment: {
            position: 'start'
          }
        }}
        format="dd MMMM"
        disablePast
        value={day}
        onChange={(newValue: Value | null, ctx: any) => handleChange(newValue as Value)}
      />
    </LocalizationProvider>
  );
};
