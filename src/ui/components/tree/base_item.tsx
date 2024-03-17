import styled from '@emotion/styled';
import React from 'react';
import { type PipeStyle } from 'ui/components/icon/tree_guide';
import {
  OpenState,
  type TreeListItemProps,
} from './tree';

export type OpenButton = React.ComponentType<{ open: boolean, onToggleOpen: () => void }>;
export type GuideIcon = React.ComponentType<{ pipeStyle: PipeStyle }>;

export type BaseTreeListItemProps<T> = TreeListItemProps<T> & {
  ListItem: React.ComponentType<T>,
  OpenButton: OpenButton,
  GuideIcon: GuideIcon,
};

const BaseTreeListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  box-sizing: border-box;
`;

export function BaseTreeListItem<T>({
  value,
  open,
  onToggleOpen,
  ListItem,
  OpenButton,
  GuideIcon,
  pipes,
}: BaseTreeListItemProps<T>) {
  return (
    <BaseTreeListItemContainer>
      {pipes.map((pipeStyle, index) => (
        <GuideIcon
          key={index}
          pipeStyle={pipeStyle}
        />
      ))}
      {open !== OpenState.Childless
        && (
          <OpenButton
            open={open === OpenState.Open}
            onToggleOpen={onToggleOpen}
          />
        )}
      <ListItem
        {...value}
        {...{}}
      />
    </BaseTreeListItemContainer>
  );
}
