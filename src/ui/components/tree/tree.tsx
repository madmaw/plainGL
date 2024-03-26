import {
  useCallback,
  useMemo,
} from 'react';
import { type PipeStyle } from 'ui/components/icon/internal/tree_guide';
import { List } from 'ui/components/list';

export const enum OpenState {
  Open,
  Closed,
  Childless,
}

export type TreeItem<T> = {
  key: string,
  value: T,
  open: OpenState,
  pipes: readonly PipeStyle[],
};

export type TreeListItemProps<T> = {
  value: T,
  pipes: readonly PipeStyle[],
  open: OpenState,
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
    pipes,
  }: TreeItem<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onListItemToggleOpen = useCallback(() => {
      onToggleOpen(value);
    }, [value]);
    return (
      <TreeListItem
        open={open}
        value={value}
        pipes={pipes}
        onToggleOpen={onListItemToggleOpen}
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
