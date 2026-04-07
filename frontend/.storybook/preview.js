import 'bootswatch/dist/darkly/bootstrap.min.css';
import 'css/App.css';
import 'stories/storybook-overrides.css';
/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  tags: ['autodocs'],
  parameters: {
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
    <main>
      <Story />
    </main>
  ),
];

export default preview;