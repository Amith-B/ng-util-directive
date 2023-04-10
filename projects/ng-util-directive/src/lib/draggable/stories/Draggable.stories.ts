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
        'When `true` the draggable element will move to either right or left of the screen when pointer leaves the host',
    },
    draggableStickyMargins: {
      description:
        'You can add a margin to the sticky positions when the host sticks to left or right of screen',
      defaultValue: { summary: '0px' },
    },
    draggableStickyTransition: {
      description: 'Can be used to change the sticky transition',
      defaultValue: { summary: 'left 0.3s ease' },
    },
  },
} as Meta;

export const Basic: Story = (args: any) => ({
  props: args,
  template: `
  <b>Note: The dom element on which you use this directive gets a style position: fixed; when dragged, if any of the parent of this dom element has transform css property in it then the position wouldn't behave as expected, so it is recommended to keep your floating item out of the parent which has transform css property in it</b>
  <br/>
  <div
    draggable
    [draggableSticky]="draggableSticky"
    [draggableStickyMargins]="draggableStickyMargins"
    [draggableStickyTransition]="draggableStickyTransition"
    class="floating-button"
  >+</div>
  `,
  styles: [
    `
      .floating-button {
        width: 48px;
        height: 48px;
        background-color: orange;
        font-size: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
    `,
  ],
});

Basic.args = {
  draggableSticky: true,
  draggableStickyMargins: '0px',
  draggableStickyTransition: 'left 0.3s ease',
};
