import { UnreachableError } from 'base/unreachable_error';
import { type PropsWithChildren } from 'react';

export const enum AsyncStateType {
  Success = 1,
  Failure,
  Loading,
}

export type AsyncState<Value, Reason, Progress> = {
  type: AsyncStateType.Success,
  value: Value,
} | {
  type: AsyncStateType.Failure,
  reason: Reason,
} | {
  type: AsyncStateType.Loading,
  progress: Progress,
};

export type AsyncProps<Value, Reason, Progress> = PropsWithChildren<{
  state: AsyncState<Value, Reason, Progress>,
  Success: React.ComponentType<PropsWithChildren<{ value: Value }>>,
  Failure: React.ComponentType<{ reason: Reason }>,
  Loading: React.ComponentType<{ progress: Progress }>,
}>;

export function Async<Value, Progress = void, Reason = void>({
  state,
  children,
  Loading,
  Success,
  Failure,
}: AsyncProps<Value, Progress, Reason>) {
  switch (state.type) {
    case AsyncStateType.Success:
      return (
        <Success {...state}>
          {children}
        </Success>
      );
    case AsyncStateType.Loading:
      return <Loading {...state} />;
    case AsyncStateType.Failure:
      return <Failure {...state} />;
    default:
      throw new UnreachableError(state);
  }
}
