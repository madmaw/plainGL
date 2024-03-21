import { Size } from 'app/ui/metrics';
import { createPartialComponent } from 'base/react/partial';
import { type ComponentType } from 'react';
import {
  Async,
  type AsyncState,
} from 'ui/components/async';

export function install({
  Loading: LoadingImpl,
}: {
  Loading: ComponentType<{ size: Size }>,
}) {
  const Loading = createPartialComponent(LoadingImpl, {
    size: Size.Large,
  });

  function IndefiniteAsync<Value, Reason>({
    state,
    Success,
    Failure,
  }: {
    state: AsyncState<Value, Reason, void>,
    Success: ComponentType<{ value: Value }>,
    Failure: ComponentType<{ reason: Reason }>,
  }) {
    const Component = Async<Value, Reason, void>;
    return (
      <Component
        Failure={Failure}
        Loading={Loading}
        Success={Success}
        state={state}
      />
    );
  }

  return {
    IndefiniteAsync,
  };
}
