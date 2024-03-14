import {
  useCallback,
  useMemo,
} from 'react';
import { List } from 'ui/components/list';

export type TreeItem<T> = {
  key: string,
  value: T,
  open: boolean,
  depth: number,
  lastChild: boolean,
};

export type TreeListItemProps<T> = {
  value: T,
  depth: number,
  lastChild: boolean,
  open: boolean,
  onToggleOpen: () => void,
};

export type TreeProps<T> = {
  items: readonly TreeItem<T>[],
  onToggleOpen: (item: T) => void,
  TreeListItem: React.ComponentType<TreeListItemProps<T>>,
};

export function Tree<T>(props: TreeProps<T>) {
  const TreeList = useMemo(function () {
    return List<TreeItem<T>>;
  }, []);
  const {
    items,
    onToggleOpen,
    TreeListItem,
  } = props;

  const getTreeKey = useCallback(function ({ key }: TreeItem<T>) {
    return key;
  }, []);

  const TreeListItemImpl = useCallback(function ({
    value,
    open,
    depth,
    lastChild,
  }: TreeItem<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onListItemToggleOpen = useCallback(() => {
      onToggleOpen(value);
    }, [value]);
    return (
      <TreeListItem
        open={open}
        value={value}
        onToggleOpen={onListItemToggleOpen}
        depth={depth}
        lastChild={lastChild}
      />
    );
  }, [
    onToggleOpen,
    TreeListItem,
  ]);

  return (
    <TreeList
      getKey={getTreeKey}
      items={items}
      ListItem={TreeListItemImpl}
    />
  );
}
