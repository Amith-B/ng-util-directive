import { Meta, Story } from '@storybook/angular/types-6-0';

import { NgDebounceEventModule } from '../ng-debounce-event.module';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Directives/NgDebounceEvent',
  decorators: [
    moduleMetadata({
      imports: [NgDebounceEventModule],
    }),
  ],
  argTypes: {},
} as Meta;

export const Basic: Story = (args: any) => ({
  props: args,
  template: `
    <button>Click Debounce</button>
    <input placeholder="Value changes debounce"/>
  `,
});

Basic.args = {};
