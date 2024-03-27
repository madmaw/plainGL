import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { observer } from 'mobx-react';
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { type LoggingService } from 'service/logging';
import { GenericAsync } from 'ui/components/async/generic';
import {
  LinguiModel,
  LinguiPresenter,
} from './presenter';
import {
  type LinguiWrapper,
  type LinguiWrapperProps,
} from './types';

export function install({
  loggingService,
}: {
  loggingService: LoggingService,
}): LinguiWrapper {
  return function ({
    loadMessages,
    locale,
    children,
  }: LinguiWrapperProps) {
    const model = useMemo(function () {
      return new LinguiModel();
    }, []);
    const presenter = useMemo(function () {
      return new LinguiPresenter(i18n, loadMessages, loggingService);
    }, [loadMessages]);

    const requestLoadLocale = useCallback(function (locale: string) {
      return presenter.requestLoadLocale(model, locale);
    }, [
      model,
      presenter,
    ]);

    const Async = useCallback(function ({
      children,
      locale,
    }: PropsWithChildren<{ locale: string }>) {
      useEffect(function () {
        requestLoadLocale(locale);
      }, [locale]);

      return (
        <GenericAsync state={model.state}>
          {children}
        </GenericAsync>
      );
    }, [
      model,
      requestLoadLocale,
    ]);
    const ObserverAsync = useMemo(function () {
      return observer(Async);
    }, [Async]);
    return (
      <ObserverAsync locale={locale}>
        <I18nProvider i18n={i18n}>
          {children}
        </I18nProvider>
      </ObserverAsync>
    );
  };
}
