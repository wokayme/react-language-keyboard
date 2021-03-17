import App from './index';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'Example/App',
    component: App,
  } as Meta;
  
  export const Template: Story<unknown> = (args) => <App {...args} />;