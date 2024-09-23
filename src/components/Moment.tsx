import { ComponentType } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { Container, UtilType, ComponentProps } from './types';
import Time from './Time';

export const MomentBox: Container = ({children}) => (
  <Box sx={{
    width: 237,
    height: 75,
    borderRadius: 'inherit'
  }}>
    {children}
  </Box>
);

export const MomentBlock = styled.div<{ color?: UtilType.Color }>`
  ${({color}) => `
    width: inherit;
    height: inherit;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${color || 'white'};
    color: ${color ? 'white' : 'black'};
  `}
`;

export default function Moment(props: ComponentProps.MomentProps) {
  const { content: { text = '', moment = DateTime.now(), color } } = props;

  return (
    <MomentBox>
      <MomentBlock color={color}>
        <span>{text}</span>
      </MomentBlock>
      <Box style={{ position: 'absolute', marginLeft: 217, marginTop: -2 }}>
        <Time value={moment} />
      </Box>
    </MomentBox>
  );
};

export const ControlMomentNeedle = styled.div<ComponentProps.ControlMomentNeedleProps>`
  ${({width, height}) => `
    position: absolute;
    width: ${width || '3.7em'};
    height: ${height || '0.4em'};
    background: red;
    border-radius: 3px;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
    rotate: 90deg;
  
    &:before {
      position: inherit;
      background: inherit;
      box-shadow: inherit;
      content: '';
      width: 1em;
      height: 1em;
      border-radius: 50%;
      top: -0.3em;
      left: -0.3em;
    }
  `}
`;

export const ControlMoment: ComponentType<ComponentProps.ControlMomentProps> = (props) => {
  const { time = DateTime.now() } = props;

  return (
    <ControlMomentNeedle>
      <Time value={time} />
    </ControlMomentNeedle>
  );
};
