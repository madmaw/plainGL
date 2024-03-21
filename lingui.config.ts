import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  locales: ['en'],
  catalogs: [
    {
      path: '<rootDir>/src/app/editor/locales/{locale}',
      include: ['src/app/editor'],
    },
  ],
};

export default config;
