import { type Node } from './types';

export function map<T, O>(
  node: Node<T>,
  f: (node: Node<T>, indices: readonly number[], maximums: readonly number[]) => O,
  filterChildren: (node: Node<T>) => boolean = () => true,
): readonly O[] {
  return mapInternal(node, f, filterChildren);
}

function mapInternal<T, O>(
  node: Node<T>,
  f: (node: Node<T>, indices: readonly number[], maximums: readonly number[]) => O,
  filterChildren: (node: Node<T>) => boolean,
  indices: readonly number[] = [],
  maximums: readonly number[] = [],
  traversed: Set<Node<T>> = new Set(),
): readonly O[] {
  if (traversed.has(node)) {
    return [];
  }
  traversed.add(node);
  const result = f(node, indices, maximums);
  if (filterChildren(node)) {
    return [result];
  }
  const newMaximums = maximums.concat([node.connections.length]);
  return [
    result,
    ...node.connections.flatMap((connection, index) => {
      return mapInternal(connection, f, filterChildren, indices.concat([index]), newMaximums);
    }),
  ];
}
