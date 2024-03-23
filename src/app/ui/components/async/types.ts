import {
  type ComponentType,
  type PropsWithChildren,
} from 'react';
import {
  type AsyncState,
  type AsyncStateType,
} from 'ui/components/async';

export type GenericAsyncProps = PropsWithChildren<{ state: { type: AsyncStateType } }>;

export type GenericAsync = ComponentType<GenericAsyncProps>;

export type AsyncProps<Value, Reason, Progress> = PropsWithChildren<{
  state: AsyncState<Value, Reason, Progress>,
}>;

export type Async<Value, Reason, Progress> = ComponentType<
  AsyncProps<Value, Reason, Progress>
>;
