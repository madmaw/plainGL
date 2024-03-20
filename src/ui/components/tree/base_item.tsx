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
  gap: number,
};

const BaseTreeListItemContainer = styled.div<{ gap: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  gap: ${({ gap }) => gap}px;
`;

export function BaseTreeListItem<T>({
  value,
  open,
  onToggleOpen,
  ListItem,
  OpenButton,
  pipes,
  gap,
}: BaseTreeListItemProps<T>) {
  return (
    <BaseTreeListItemContainer gap={gap}>
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
