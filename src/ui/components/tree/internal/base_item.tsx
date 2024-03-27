import styled from '@emotion/styled';
import React from 'react';
import { type TreeListItemProps } from 'ui/components/tree/tree';
import { type OpenCloseButton } from 'ui/components/tree/types';

export type BaseTreeListItemProps<T> = TreeListItemProps<T> & {
  ListItem: React.ComponentType<T>,
  OpenCloseButton: OpenCloseButton,
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
  OpenCloseButton,
  pipes,
  gap,
}: BaseTreeListItemProps<T>) {
  return (
    <BaseTreeListItemContainer gap={gap}>
      <OpenCloseButton
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
