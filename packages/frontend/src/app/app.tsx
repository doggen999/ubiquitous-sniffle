import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const App = () => (
  <FluentProvider theme={webLightTheme}>
    <div>This is the app</div>
  </FluentProvider>
);

export default App;
