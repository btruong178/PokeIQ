import 'bootswatch/dist/darkly/bootstrap.min.css';
import 'css/App.css';
import 'stories/storybook-overrides.css';
import { MemoryRouter } from 'react-router-dom';
/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <main>
        <Story />
      </main>
    </MemoryRouter>
  ),
];

export default preview;