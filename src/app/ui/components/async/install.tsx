import { createPartialComponent } from 'base/react/partial';
import {
  type ComponentType,
  type PropsWithChildren,
  useMemo,
} from 'react';
import { Async } from 'ui/components/async';
import {
  type GenericAsync,
  type GenericAsyncProps,
} from './types';

export function install({
  Loading,
  Failure,
}: {
  Loading: ComponentType,
  Failure: ComponentType,
}): {
  GenericAsync: GenericAsync,
} {
  const Success = function ({ children }: PropsWithChildren) {
    return children;
  };

  const Component = Async<void, void, void>;
  const GenericAsyncImpl = createPartialComponent(Component, {
    Success,
    Failure,
    Loading,
  });

  function GenericAsync({
    children,
    state: {
      type,
    },
  }: GenericAsyncProps) {
    const state = useMemo(function () {
      return {
        type,
        value: undefined,
        reason: undefined,
        progress: undefined,
      };
    }, [type]);
    return (
      <GenericAsyncImpl state={state}>
        {children}
      </GenericAsyncImpl>
    );
  }

  return {
    GenericAsync,
  };
}
