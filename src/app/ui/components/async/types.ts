import {
  type ComponentType,
  type PropsWithChildren,
} from 'react';
import { type AsyncState } from 'ui/components/async';

export type IndefiniteAsyncProps<Value, Reason> = PropsWithChildren<{
  Success: ComponentType<PropsWithChildren<{ value: Value }>>,
  Failure: ComponentType<{ reason: Reason }>,
  state: AsyncState<Value, Reason, void>,
}>;

export type IndefiniteAsync<Value, Reason> = ComponentType<IndefiniteAsyncProps<Value, Reason>>;

export type AsyncProps<Value, Reason, Progress> = PropsWithChildren<{
  state: AsyncState<Value, Reason, Progress>,
}>;

export type Async<Value, Reason, Progress> = ComponentType<
  AsyncProps<Value, Reason, Progress>
>;
