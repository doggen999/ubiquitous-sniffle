import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  Client,
  Provider as GraphQLProvider,
  cacheExchange,
  fetchExchange,
} from 'urql';

import {
  FluentProvider,
  webLightTheme,
  Theme,
} from '@fluentui/react-components';

import App from './app';

const client = new Client({
  // TODO: env var
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

const root = createRoot(document.getElementById('app'));

const customLightTheme: Theme = {
  ...webLightTheme,

  fontFamilyBase: 'Open Sans, sans-serif',
};

root.render(
  <StrictMode>
    <FluentProvider theme={customLightTheme}>
      <GraphQLProvider value={client}>
        <App />
      </GraphQLProvider>
    </FluentProvider>
  </StrictMode>
);
