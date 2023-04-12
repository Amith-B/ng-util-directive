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
  argTypes: {
    debounceEventName: {
      description:
        'The name of the event that needs to be listened on host element',
      defaultValue: { summary: 'click' },
    },
    debounceEventTimer: {
      description: 'Debounce timer in milliseconds',
      defaultValue: { summary: '100' },
    },
    debounceEvent: {
      description: 'Event emitted from host element',
      action: 'debounceEvent',
    },
    index: {
      table: { disable: true },
    },
    search: {
      table: { disable: true },
    },
  },
} as Meta;

export const Basic: Story = (args: any) => ({
  props: args,
  styles: [
    `
    button {
      padding: 1rem;
      font-size: 1rem;
      font-weight: 700;
      background: dodgerblue;
      outline: none;
      border: none;
      border-radius: 12px;
      color: white;
    }
    button:hover {
      opacity: 0.8;
      cursor: pointer;
    }
    button:active {
      opacity: 0.9;
    }
    p {
      font-size: 1.5rem;
      margin: 0;
    }
  `,
  ],
  template: `
    <p>Click count: {{ index }}</p>
    <button (debounceEvent)="index = index + 1" [debounceEventName]="debounceEventName" [debounceEventTimer]="debounceEventTimer">Debounce Event</button>
  `,
});

Basic.args = {
  debounceEventName: 'click',
  debounceEventTimer: 1000,
  index: 0,
};

export const Search: Story = (args: any) => ({
  props: args,
  styles: [
    `
    p {
      font-size: 1.5rem;
      margin: 0;
    }
    input {
      margin-top: 1rem;
      border-radius: 10px;
      font-size: 1.5rem;
    }
  `,
  ],
  template: `
    <p>Search string: {{ search }}</p>
    <input (debounceEvent)="search = $event.target.value" debounceEventName="input" [debounceEventTimer]="500" placeholder="Type something"/>
  `,
});

Search.args = {
  search: '',
};
