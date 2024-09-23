import { ComponentType, PropsWithChildren, MouseEvent } from 'react';
import { DateTime, Duration } from 'luxon';

export namespace Enum {
  export const enum Command {
    INIT,
    ADD,
    UPDATE,
    REMOVE
  };

  export const enum Settings {
    DAYS,
    MOMENT_SERIES,
    CONTROL_MOMENTS
  };
};

export namespace Data {
  export type Day = DateTime;

  export type Time = DateTime;

  export type Moment = {
    text?: string;
//    duration?: Duration;
    moment?: Time;
  };

  export type ControlMoment = Moment & {
  };

  export type Days = Array<Day>;

  export type MomentSeries = Array<Moment>;

  export type ControlMoments = Array<ControlMoment>;
};

export type Container = ComponentType<PropsWithChildren<unknown>>;

export namespace UtilType {
  export type Color = string;

  export type ColoredMoment = Data.Moment & {
    color?: Color;
  };

  export type ColoredMomentSeries = Array<ColoredMoment>;

  export type ButtonClick = () => void;

  export type DoubleClick = () => void;

  export type Remove = () => void;
};

export type ContextState = {
  days: Data.Days;
  momentSeries: Array<UtilType.ColoredMomentSeries>;
  controlMoments: Array<Data.ControlMoments>;
};

export namespace ComponentUtilType {
  export type DayAdd = () => void;

  export type DayChange = (newValue: Data.Day) => void;

  export type MomentEditorOpen = () => void;

  export type MomentChange = (newValue: UtilType.ColoredMoment) => void;

  export type MomentEditorClose = () => void;

  export type MomentSeriesAdd = (value: UtilType.ColoredMoment) => void;

  export type ClickEvent = MouseEvent<HTMLElement>;

  export type MomentSeriesChange = (index: number, newValue: UtilType.ColoredMoment) => void;

  export type MomentSeriesRemove = (index: number) => void;
};

export namespace Decorator {
  export interface Removable {
    onRemove: UtilType.Remove;
  };

  export interface Changeable {
    onDoubleClick: UtilType.DoubleClick;
  };

  export interface MotionButton {
  };
};

export namespace ComponentProps {
  export type DayProps = {
    value?: Data.Day;
    onChange: ComponentUtilType.DayChange;
  };

  export type MomentProps = {
    content: UtilType.ColoredMoment;
//    onChange: ComponentUtilType.MomentChange;
  };

  export type MotionMomentProps = MomentProps & {
  };

  export type TimeDurationProps = {
    value?: Duration;
  };

  export type TimeProps = {
    value?: Data.Time;
  };

  export type MomentEditorProps = MomentProps & {
    onReject?: ComponentUtilType.MomentEditorClose;
    onConfirm: ComponentUtilType.MomentChange;
  };

  export type ControlMomentProps = {
    time?: DateTime;
  };

  export type ControlMomentNeedleProps = {
    width?: string;
    height?: string;
  };

  export type MomentSeriesProps = {
    values?: UtilType.ColoredMomentSeries;
    onAdd: ComponentUtilType.MomentSeriesAdd;
    onChange: ComponentUtilType.MomentSeriesChange;
    onRemove: ComponentUtilType.MomentSeriesRemove;
  };

  export type DayMomentSeriesProps = {
    day?: Data.Day;
    momentSeries?: UtilType.ColoredMomentSeries;
    onDayChange: ComponentUtilType.DayChange;
    onMomentSeriesAdd: ComponentUtilType.MomentSeriesAdd;
    onMomentSeriesChange: ComponentUtilType.MomentSeriesChange;
    onMomentSeriesRemove: ComponentUtilType.MomentSeriesRemove;
  };

  export type ChartProps = {
  };
};
