import { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import { Decorator } from './types';

export default function Removable(WrappedComponent: typeof Component) {
  return (props: Decorator.Removable) => (
    <>
      <WrappedComponent />
      <IconButton onClick={props.onRemove}>
        <DisabledByDefaultIcon fontSize="inherit" />
      </IconButton>
    </>
  );
}
