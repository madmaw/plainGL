import { type Messages } from '@lingui/core';
import { type GenericAsync } from 'ui/components/async/types';
import {
  type ComponentType,
  type PropsWithChildren,
} from 'react';

export type LinguiWrapperProps = PropsWithChildren<{
  loadMessages: (locale: string) => Promise<Messages>,
  locale: string,
  Async: GenericAsync,
}>;

export type LinguiWrapper = ComponentType<LinguiWrapperProps>;
