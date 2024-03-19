import styled from '@emotion/styled';
import React from 'react';
import { type PipeStyle } from 'ui/components/icon/tree_guide';
import {
  type OpenState,
  type TreeListItemProps,
} from './tree';

export type OpenButton = React.ComponentType<{
  readonly pipes: readonly PipeStyle[],
  readonly open: OpenState,
  readonly onToggleOpen: () => void,
}>;
export type GuideIcon = React.ComponentType<{ pipeStyle: PipeStyle }>;

export type BaseTreeListItemProps<T> = TreeListItemProps<T> & {
  ListItem: React.ComponentType<T>,
  OpenButton: OpenButton,
};

const BaseTreeListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

export function BaseTreeListItem<T>({
  value,
  open,
  onToggleOpen,
  ListItem,
  OpenButton,
  pipes,
}: BaseTreeListItemProps<T>) {
  return (
    <BaseTreeListItemContainer>
      <OpenButton
        pipes={pipes}
        open={open}
        onToggleOpen={onToggleOpen}
      />
      <ListItem
        {...value}
        {...{}}
      />
    </BaseTreeListItemContainer>
  );
}
