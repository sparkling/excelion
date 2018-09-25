import { configure, addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withInfo);
addDecorator(withNotes);

//setConsoleOptions({
//  panelExclude: [],
//});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
