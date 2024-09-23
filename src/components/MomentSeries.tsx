import { ComponentType, useCallback } from 'react';
import { Box, Grid, Stack, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import styled from 'styled-components';
import { Reorder, AnimatePresence } from 'framer-motion';
import { useImmer } from 'use-immer';

import { Container, Decorator, ComponentUtilType, ComponentProps } from './types';
import useToggle from 'hooks/useToggle';
import arrayWith from 'utils/arrayWith';
import arrayRemove from 'utils/arrayRemove';
import MotionMoment from './MotionMoment';
import MomentEditor from './MomentEditor';

export const MomentSeriesBox: Container = ({children}) => (
  <Stack direction="row" children={children}
    alignItems="center"
  />
);

export const AddMoment: ComponentType<{onAdd: ComponentUtilType.MomentSeriesAdd}> = ({onAdd}) => {
  const [editing, toggleEditing] = useToggle(false);

  const handleAdd: typeof onAdd = (value) => { toggleEditing(); onAdd(value); };

  return editing ? (
    <MomentEditor content={{}} onReject={toggleEditing} onConfirm={handleAdd} />
  ) : (
   <Fab size="small" sx={{ borderRadius: 1, ml: 1 }} onClick={toggleEditing}>
     <AddIcon fontSize="inherit" />
   </Fab>
  );
};

type MomentEditorProps = Omit<ComponentProps.MomentEditorProps, 'content'>;

type MomentItemProps = ComponentProps.MotionMomentProps & MomentEditorProps & Decorator.Removable;

export const MomentItemBox = styled.div`
`;

export const MomentItem: ComponentType<MomentItemProps> = (props) => {
  type ClickEvent = ComponentUtilType.ClickEvent;
  type DoubleClick = (e: ClickEvent) => void;

  const { content, onReject, onConfirm, onRemove } = props;

//  const [hovered, toggleHover] = useToggle(false);
  const [editing, toggleEditing] = useToggle(false);

  const handleDoubleClick: DoubleClick = (e) => {e.detail === 2 && toggleEditing()};

  const handleReject: typeof onReject = () => { toggleEditing(); onReject && onReject(); };

  const handleConfirm: typeof onConfirm = (value) => { toggleEditing(); onConfirm(value); };

  const RemoveButton = (
    <Box sx={{ position: 'absolute', marginLeft: 25, marginTop: -10 }}>
      <IconButton onClick={onRemove}>
        <DisabledByDefaultIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );

  return editing ? (
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      <MomentEditor content={content} onReject={handleReject} onConfirm={handleConfirm} />
    </div>
  ) : (
    <MomentItemBox onClick={handleDoubleClick} /*onMouseOver={(e: any) => toggleHover()} onMouseOut={(e: any) => toggleHover()}*/>
      <MotionMoment content={content}>
        {RemoveButton}
      </MotionMoment>
    </MomentItemBox>
  )
};

export default function MomentSeries(props: ComponentProps.MomentSeriesProps) {
  const { values = [], onAdd, onChange, onRemove } = props;

  type Moment = typeof values[number];
  type Series = typeof values;

  const [momentSeries, setMomentSeries] = useImmer<Series>(values);

  type Add = typeof onAdd;
  type Change = typeof onChange;
  type Remove = typeof onRemove;

  type Reorder = (reordered: Series) => void;

  const handleReorder = useCallback<Reorder>((reordered) => {
    setMomentSeries(reordered);
// eslint-disable-next-line
  }, []);

  const handleMomentAdd = useCallback<Add>((value) => {
    setMomentSeries(momentSeries.concat(value));
    onAdd(value);
// eslint-disable-next-line
  }, [momentSeries]);

  const handleMomentChange = useCallback<Change>((index, newValue) => {
    setMomentSeries(arrayWith(momentSeries, index, newValue));
    onChange(index, newValue);
// eslint-disable-next-line
  }, [momentSeries]);

  const handleMomentRemove = useCallback<Remove>((index) => {
    setMomentSeries(arrayRemove(momentSeries, index));
    onRemove(index);
// eslint-disable-next-line
  }, [momentSeries]);

  return (
    <MomentSeriesBox>
      <Reorder.Group axis="x" values={momentSeries} onReorder={handleReorder}>
        <AnimatePresence>
          {momentSeries.map((moment: Moment, index: number) => (
            <MomentItem key={crypto.randomUUID()} content={moment}
              onConfirm={(newMoment: Moment) => handleMomentChange(index, newMoment)}
              onRemove={() => handleMomentRemove(index)}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <AddMoment onAdd={(newMoment: Moment) => handleMomentAdd(newMoment)} />
    </MomentSeriesBox>
  );
};
