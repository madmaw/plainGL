import { type TreeProps as TreePropsImpl } from 'ui/components/tree/tree';

export type TreeProps<T> = Pick<
  TreePropsImpl<T>,
  | 'items'
  | 'onToggleOpen'
> & {
  TreeListItemContent: React.ComponentType<T>,
};

export type Tree<T> = React.ComponentType<TreeProps<T>>;
