import { Component } from 'react';

import { Decorator } from './types';

export default function Changeable(WrappedComponent: typeof Component) {
  return (props: Decorator.Changeable) => (
    <WrappedComponent onDoubleClick={props.onDoubleClick} />
  );
}
