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
    },
    console: {
      table: { disable: true },
    },
  },
} as Meta;

export const Basic: Story = (args: any) => ({
  props: {
    ...args,
    handleIntersection: (
      event: IntersectionObserverEntry,
      target: HTMLElement
    ) => {
      console.log(event);
      if (event.isIntersecting) {
        target.style.background = 'lightgreen';
        target.innerHTML = 'Visible';
      } else {
        target.style.background = '#ff8787';
        target.innerHTML = 'Hidden';
      }
    },
  },
  template: `
  <p> Scroll below container to see the img which has directive in it </p>
  <div 
    style="max-height: 400px; overflow: auto; border: 1px solid black; position: relative;
    "
  >
    <p #info style="position: sticky; top: 0; margin: 0; margin-left: 150px; padding: 0.5rem;"></p>
    <div style="height: 2000px; padding-top: 800px;">
      <img
        (ngContainerIntersection)="handleIntersection($event, info)"
        style="width: 200px; height: 100px; border-radius: 20px;"
        src="art.jpg"
      />
    </div>
  </div>

  <!--
  handleIntersection: (
    event: IntersectionObserverEntry,
    target: HTMLElement
  ) => {
    console.log(event);
    if (event.isIntersecting) {
      target.style.background = 'lightgreen';
      target.innerHTML = 'Visible';
    } else {
      target.style.background = '#ff8787';
      target.innerHTML = 'Hidden';
    }
  }
  -->
  `,
});

Basic.args = {
  console: console,
};
