import styled from '@emotion/styled';
import React from 'react';
import { type TreeListItemProps } from './tree';

export type OpenButton = React.ComponentType<{ open: boolean, onToggleOpen: () => void }>;
export type GuideIcon = React.ComponentType<{ lastChild: boolean }>;

export type BaseTreeListItemProps<T> = TreeListItemProps<T> & {
  depthIndentPx: number,
  ListItem: React.ComponentType<T>,
  OpenButton: OpenButton,
  GuideIcon?: GuideIcon,
};

const BaseTreeListItemContainer = styled.div<{ indentPx: number }>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-left: ${({ indentPx }) => indentPx}px;
  box-sizing: border-box;
`;

export function BaseTreeListItem<T>({
  value,
  open,
  onToggleOpen,
  depth,
  depthIndentPx,
  lastChild,
  ListItem,
  OpenButton,
  GuideIcon,
}: BaseTreeListItemProps<T>) {
  return (
    <BaseTreeListItemContainer indentPx={depth * depthIndentPx}>
      {depth > 0 && GuideIcon && <GuideIcon lastChild={lastChild} />}
      <OpenButton
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
