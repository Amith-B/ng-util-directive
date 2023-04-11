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
      defaultValue: { summary: 'true' },
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
    draggableTeleportTo: {
      description:
        'A css id selector to which the host element will be appended when dragging starts. If `undefined` nothing happens, if some css selector is passed then the host element will be appended to the specified css selector element if already available in dom or else it will create one with give selector and will append it to body',
      defaultValue: { summary: 'undefined' },
    },
  },
} as Meta;

export const Basic: Story = (args: any) => ({
  props: args,
  template: `
  <b>Note:</b> The dom element on which you use this directive gets a style <b>position: fixed;</b> when dragged, if any of the parent of this dom element has transform css property in it then the position wouldn't behave as expected, so it is recommended to keep your floating item out of the parent which has transform css property in it. Or alternatively you can use <b>draggableTeleportTo</b> prop to move it under any specified dom when dragging starts.
  <br/>
  <div
    draggable
    [draggableSticky]="draggableSticky"
    [draggableStickyMargins]="draggableStickyMargins"
    [draggableStickyTransition]="draggableStickyTransition"
    [draggableTeleportTo]="draggableTeleportTo"
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
  draggableTeleportTo: 'modal-container',
};
