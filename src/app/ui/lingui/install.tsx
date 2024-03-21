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
import {
  LinguiModel,
  LinguiPresenter,
} from './presenter';
import { type LinguiWrapperProps } from './types';

export function install({
  loggingService,
}: {
  loggingService: LoggingService,
}) {
  return function ({
    loadMessages,
    locale,
    Async: AsyncImpl,
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
        <AsyncImpl state={model.state}>
          {children}
        </AsyncImpl>
      );
    }, [
      AsyncImpl,
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
