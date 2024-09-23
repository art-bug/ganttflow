import { ComponentType, useState, useCallback } from 'react';
import { Box, Stack, TextField, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DateTime } from 'luxon';
import { ColorPicker, Color, createColor } from "material-ui-color";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { Container, UtilType, ComponentProps } from './types';
import isText from 'utils/isText';
import MotionButton from './MotionButton';

export const MomentEditorBox: Container = ({children}) => (
  <Box p={1} sx={{ width: 'min-content', border: '2px solid black', borderRadius: '5px' }}>
    <Stack spacing={2} children={children}
      justifyContent="center"
    />
  </Box>
);

export const MomentEditorButtons: Container = ({children}) => (
  <Stack direction="row" spacing={2} children={children}
    alignItems="center" justifyContent="center"
  />
);

export const Reject: ComponentType<{onReject: UtilType.ButtonClick}> = ({onReject}) => (
  <MotionButton>
    <IconButton color="error" sx={{ borderRadius: 1 }} onClick={onReject}>
      <CloseIcon fontSize="inherit" />
    </IconButton>
  </MotionButton>
);

export const Confirm: ComponentType<{onConfirm: UtilType.ButtonClick}> = ({onConfirm}) => (
  <MotionButton>
    <IconButton color="success" sx={{ borderRadius: 1 }} onClick={onConfirm}>
      <CheckIcon fontSize="inherit" />
    </IconButton>
  </MotionButton>
);

export default function MomentEditor(props: ComponentProps.MomentEditorProps) {
  const {
    content: { text = '', moment = '', color = '' },
    onReject, onConfirm
  } = props;

  const defaultTime: typeof moment = moment ? isText(moment) ? DateTime.fromISO(moment) : moment : DateTime.now().plus({ minutes: 1 });

  type Time = typeof defaultTime;

  const [currentText, setText] = useState<string>(text);
  const [time, setTime] = useState<Time>(defaultTime);
  const [currentColor, setColor] = useState<Color>(createColor(color));

  const handleTextChange = useCallback<typeof setText>((newValue) => setText(newValue), []);
  const handleTimeChange = useCallback<typeof setTime>((newValue) => setTime(newValue), []);
  const handleColorChange = useCallback<typeof setColor>((newValue) => setColor(newValue), []);

  const handleConfirm: UtilType.ButtonClick = () => {
    let newColor: typeof color = currentColor.css.backgroundColor as typeof color;
    newColor = newColor === 'white' ? '' : newColor;

    onConfirm({ text: currentText, moment: time, color: newColor });
  };

  return (
    <MomentEditorBox>
      <TextField variant="standard"
        value={currentText}
        onChange={(e: any) => handleTextChange(e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <TimePicker viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock
        }}
          ampm={false}
          disablePast={time.hasSame(DateTime.now(), 'day')}
          value={time}
          onChange={(newValue: Time | null, ctx: any) => handleTimeChange(newValue as Time)}
        />
      </LocalizationProvider>
      <ColorPicker value={currentColor} onChange={(newValue: Color) => handleColorChange(newValue)} />
      <MomentEditorButtons>
        <Reject onReject={() => onReject && onReject()} />
        <Confirm onConfirm={handleConfirm} />
      </MomentEditorButtons>
    </MomentEditorBox>
  );
};
