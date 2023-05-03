import { Meta, Story } from '@storybook/angular/types-6-0';

import { NgClickOutsideModule } from '../ng-click-outside.module';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Directives/NgClickOutside',
  decorators: [
    moduleMetadata({
      imports: [NgClickOutsideModule],
    }),
  ],
  argTypes: {
    clickOutside: {
      description:
        'An output event which emits click event when clicked outside of the host element',
      action: 'clickOutside',
    },
    data: {
      table: { disable: true },
    },
  },
} as Meta;

export const Basic: Story = (args: any) => ({
  props: {
    ...args,
    handleClickOutside: (
      event: ResizeObserverEntry,
      data: { count: number }
    ) => {
      console.log(event);
      data.count += 1;
    },
  },
  template: `
  <div
    (clickOutside)="handleClickOutside($event, data)"
    style="width: 200px; height: 200px; background-color: lightgreen; margin: auto; display: flex; align-items: center; justify-content: center; text-align: center;"
  >
    Clicking outside will increment this number: {{data.count}}
  </div>
  `,
});

Basic.args = {
  data: { count: 0 },
};
