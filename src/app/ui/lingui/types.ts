import { type Messages } from '@lingui/core';
import { type Async } from 'app/ui/components/async/types';
import {
  type ComponentType,
  type PropsWithChildren,
} from 'react';

export type LinguiWrapperProps = PropsWithChildren<{
  loadMessages: (locale: string) => Promise<Messages>,
  locale: string,
  Async: Async<void, void, void>,
}>;

export type LinguiWrapper = ComponentType<LinguiWrapperProps>;
