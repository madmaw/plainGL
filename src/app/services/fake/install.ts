import { type Services } from 'app/services/types';
import { FakeLoggingService } from 'service/fake/logging';

export function install(): Services {
  const loggingService = new FakeLoggingService({});

  return {
    loggingService,
  };
}
