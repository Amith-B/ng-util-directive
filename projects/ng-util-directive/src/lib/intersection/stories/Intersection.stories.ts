import { Meta, Story } from '@storybook/angular/types-6-0';

import { NgContainerIntersectionModule } from '../ng-container-intersection.module';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Directives/NgContainerIntersection',
  decorators: [
    moduleMetadata({
      imports: [NgContainerIntersectionModule],
    }),
  ],
  argTypes: {
    ngContainerIntersection: {
      description:
        'An output event which emits `IntersectionObserverEntry` for the the dom element on which this directive is used.<br/>This directive uses `IntersectionObserver` internally and disconnects the observer when view is destroyed',
      action: 'ngContainerIntersection',
    }
  },
} as Meta;

export const Basic: Story = (args: any) => ({
  props: args,
  template: `
  <div 
    style="
      max-height: 400px;
      overflow: auto;
      border: 1px solid black;
      position: relative;
    "
  >
    <div style="height: 2000px">
      <p #info style="position: absolute; top: 0; left: 0;"></p>
      <div
        (ngContainerIntersection)=""
        style="
          margin-top: 800px;
          width: max-content;
          height: 40px;
          background-color: #ffaaaa82;
        "
      >Some Content</div>
    </div>
  </div>
  `,
});

Basic.args = {
};
