import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { motion, Reorder } from 'framer-motion';

import { ComponentProps } from './types';
import Moment from './Moment';

export const MotionBox = styled(motion.div)`
  border: 2px solid black;
  border-radius: 5px;
`;

const variants = {
  initial: {
    opacity: 0,
    width: 0
  },
  animate: {
    opacity: 1,
    width: 'auto'
  },
  exit: {
    opacity: 0,
    width: 0
  }
};

export default function MotionMoment(props: PropsWithChildren<ComponentProps.MotionMomentProps>) {
  const { content, children } = props;

  return (
    <Reorder.Item drag="x" whileDrag={{
        scale: 1.1,
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
      }}
      {...variants}
      key={crypto.randomUUID()}
      value={content}
    >
      <MotionBox>
        <Moment content={content} />
        {children}
      </MotionBox>
    </Reorder.Item>
  );
};
