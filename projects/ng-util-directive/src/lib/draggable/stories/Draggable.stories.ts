import { Meta, Story } from '@storybook/angular/types-6-0';

import { NgDraggableModule } from '../ng-draggable.module';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Directives/NgDraggable',
  decorators: [
    moduleMetadata({
      imports: [NgDraggableModule],
    }),
  ],
  argTypes: {
    draggableSticky: {
      description:
        'When `true` the draggable element will move to either right or left of the screen after mouseleave event',
    },
  },
} as Meta;

export const Basic: Story = (args: any) => ({
  props: args,
  template: `
  <div
    draggable
    [draggableSticky]="true"
    class="floating-button"
  >+</div>
  `,
  styles: [
    `
      .floating-button {
        width: 48px;
        height: 48px;
        background-color: orange;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        font-size: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
});

Basic.args = {};
