import { Dispatch, createContext } from 'react';
import { DateTime } from 'luxon';

import { Enum, ContextState } from './types';
import isText from 'utils/isText';
import changeDate from 'utils/changeDate';
import arrayRemove from 'utils/arrayRemove';
import arrayWith from 'utils/arrayWith';

export const INITIAL_CONTEXT_STATE = {
  days: [],
  momentSeries: [],
  controlMoments: []
};

export const Context = createContext<{
  state: ContextState;
  dispatch: Dispatch<any>;
}>({
  state: INITIAL_CONTEXT_STATE,
  dispatch: () => null
});

export default function reducer(state: ContextState, action: any) {
  const { type, payload } = action;

  type Days = typeof state.days;
  type Day = Days[number];

  type MomentSeries = typeof state.momentSeries[number];
  type Moment = MomentSeries[number];

  type ControlMomentSeries = typeof state.controlMoments[number];
  type ControlMoment = ControlMomentSeries[number];

  switch (type) {
    case Enum.Command.INIT: {
      const { setting, initialValues } = payload;

      switch (setting) {
        case Enum.Settings.DAYS:
          return { ...state, days: initialValues };

        case Enum.Settings.MOMENT_SERIES:
          return { ...state, momentSeries: initialValues };

        case Enum.Settings.CONTROL_MOMENTS:
          return { ...state, controlMoments: initialValues };
      };

      break;
    }

    case Enum.Command.ADD: {
      const { setting, opts } = payload;

      switch (setting) {
        case Enum.Settings.DAYS: {
          let last: Day = state.days.at(-1) || DateTime.now();
          last = isText(last) ? DateTime.fromISO(last) : last;

          return { ...state, days: state.days.concat(last.plus({ days: 1 })), momentSeries: state.momentSeries.concat([[]]) };
        }

        case Enum.Settings.MOMENT_SERIES: {
          const { dayIndex, value } = opts;
          return { ...state, momentSeries: arrayWith(state.momentSeries, dayIndex, state.momentSeries[dayIndex].concat(value)) }
        }

        case Enum.Settings.CONTROL_MOMENTS: {
          const { dayIndex, value } = opts;
          return { ...state, controlMoments: arrayWith(state.controlMoments, dayIndex, state.controlMoments[dayIndex].concat(value)) };
        }
      };

      break;
    }

    case Enum.Command.UPDATE: {
      const { setting, opts } = payload;

      switch (setting) {
        case Enum.Settings.DAYS: {
          const { index, newValue} = opts;

          if (state.days[index].hasSame(newValue, 'day'))
            return state;

          const newDays: Days = arrayWith(state.days, index, newValue);
          const newMomentSeries: MomentSeries = state.momentSeries[index].map((item: Moment) => changeDate(item, 'moment', newValue.toJSDate()));

          ;

          return { ...state, days: newDays, momentSeries: arrayWith(state.momentSeries, index, newMomentSeries) };
        }

        case Enum.Settings.MOMENT_SERIES: {
          const { dayIndex, index, newValue} = opts;

          const newMomentSeries: MomentSeries = arrayWith(state.momentSeries[dayIndex], index, newValue);

          return { ...state, momentSeries: arrayWith(state.momentSeries, dayIndex, newMomentSeries) };
        }
        
        case Enum.Settings.CONTROL_MOMENTS: {
          const { dayIndex, index, newValue} = opts;

          const newControlMoments: ControlMomentSeries = arrayWith(state.controlMoments[dayIndex], index, newValue);

          return { ...state, controlMoments: arrayWith(state.controlMoments, dayIndex, newControlMoments) };
        }
      };
      
      break;
    }

    case Enum.Command.REMOVE: {
      const { setting, opts } = payload;

      switch (setting) {
        case Enum.Settings.DAYS:
          return { ...state, days: arrayRemove(state.days, opts.index) };
        
        case Enum.Settings.MOMENT_SERIES: {
          const { dayIndex, index } = opts;

          const newMomentSeries: MomentSeries = arrayRemove(state.momentSeries[dayIndex], index);

          return { ...state, momentSeries: arrayWith(state.momentSeries, dayIndex, newMomentSeries) };
        }
        
        case Enum.Settings.CONTROL_MOMENTS: {
          const { dayIndex, index } = opts;

          const newControlMoments: ControlMomentSeries = arrayRemove(state.controlMoments[dayIndex], index);

          return { ...state, controlMoments: arrayWith(state.controlMoments, dayIndex, newControlMoments) };
        }
      };
      
      break;
    }
  }

  return state;
};
