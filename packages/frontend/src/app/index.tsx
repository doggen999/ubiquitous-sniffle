import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  Client,
  Provider as GraphQLProvider,
  cacheExchange,
  fetchExchange,
} from 'urql';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import App from './app';

const client = new Client({
  // TODO: env var
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <GraphQLProvider value={client}>
        <App />
      </GraphQLProvider>
    </FluentProvider>
  </StrictMode>
);
