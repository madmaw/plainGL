import { useMetrics } from 'ui/metrics';
import { BaseTreeListItem as InternalBaseTreeListItem } from './internal/base_item';
import { type TreeListItemProps } from './tree';
import { type OpenCloseButton } from './types';

export type BaseTreeListItemProps<T> = TreeListItemProps<T> & {
  ListItem: React.ComponentType<T>,
  OpenCloseButton: OpenCloseButton,
};

export function BaseTreeListItem<T>(props: BaseTreeListItemProps<T>) {
  const { gridBaseline } = useMetrics();
  return (
    <InternalBaseTreeListItem
      gap={gridBaseline}
      {...props}
    />
  );
}
