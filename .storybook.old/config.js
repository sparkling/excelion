import { configure, addDecorator } from '@storybook/react';
import { setConsoleOptions, withConsole } from '@storybook/addon-console';

setConsoleOptions({
  panelExclude: [],
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
