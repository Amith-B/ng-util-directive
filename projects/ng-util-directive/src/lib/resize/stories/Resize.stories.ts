import { Meta, Story } from '@storybook/angular/types-6-0';

import { NgContainerResizeModule } from '../ng-container-resize.module';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Directives/NgContainerResize',
  decorators: [
    moduleMetadata({
      imports: [NgContainerResizeModule],
    }),
  ],
  argTypes: {
    containerResize: {
      description:
        'An output event which emits `ResizeObserverEntry` for the the dom element on which this directive is used.<br/>This directive uses `ResizeObserver` internally and disconnects the observer when view is destroyed',
      action: 'containerResize',
    },
    JSON: {
      table: { disable: true },
    },
  },
} as Meta;

export const Basic: Story = (args: any) => ({
  props: {
    ...args,
    handleContainerResize: (event: ResizeObserverEntry) => {
      console.log(event);
      event.target.innerHTML = JSON.stringify(event.contentRect, null, '\t')
        .replace(/\n/g, '<br/>')
        .replace(
          /\t/g,
          '<div style="display: inline-block; width: 20px;"></div>'
        );
    },
  },
  template: `
  <div 
    style="
      resize: both;
      width: 400px;
      height: 400px;
      border: 1px solid black;
      padding: 1rem;
      overflow: auto;
    "
  >
    <div
      (containerResize)="handleContainerResize($event)"
      style="width: 100%; height: 100%; background-color: #ffaaaa82;
      "
    ></div>
  </div>
  <!--
  handleContainerResize: (event: ResizeObserverEntry) => {
    console.log(event);
    event.target.innerHTML = JSON.stringify(event.contentRect, null, '\t')
      .replace(/\n/g, '<br/>')
      .replace(
        /\t/g,
        '<div style="display: inline-block; width: 20px;"></div>'
      );
  }
  -->
  `,
});

Basic.args = {
  JSON: JSON,
};
