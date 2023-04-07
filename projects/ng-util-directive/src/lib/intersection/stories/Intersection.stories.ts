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
    },
    ngContainerIntersectionOptions: {
      description:
        'Options for `IntersectionObserver`. <br/>`{ root?: Element | Document | null; rootMargin?: string; threshold?: number | number[]; }`.<br/>[See Mozilla docs for more details](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver). <br/> <b>Note: `threshold` and `rootMargin` options works well when `root` option is passed. With storybook control you cannot use `root` as it expects `Element | Document` </b>',
      control: 'object',
      defaultValue: { summary: 'undefined' },
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
  <div style="max-height: 300px; overflow: auto; border: 1px solid black; position: relative;">
    <p #info style="position: sticky; top: 0; margin: 0; margin-left: 150px; padding: 0.5rem;"></p>
    <div style="height: 2000px; padding-top: 800px;">
      <img
        (ngContainerIntersection)="handleIntersection($event, info)"
        [ngContainerIntersectionOptions]="ngContainerIntersectionOptions"
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
  ngContainerIntersectionOptions: {},
};

export const WithOptions: Story = (args: any) => ({
  props: {
    ...args,
    handleIntersection: (
      event: IntersectionObserverEntry,
      target: HTMLElement,
      rootMargin?: boolean
    ) => {
      console.log(event);
      if (event.isIntersecting) {
        target.style.background = 'lightgreen';
        target.innerHTML = rootMargin ? 'Near to view' : 'Fully Visible';
      } else {
        target.style.background = '#ff8787';
        target.innerHTML = rootMargin
          ? 'Out of view'
          : 'Hidden or Partially Visible';
      }
    },
  },
  template: `
  <p> Scroll below containers to see the img which has directive in it </p>

  <code>Options: {{'{'}} threshold: 1, root: rootEl{{ '}' }}</code>
  <div #rootEl style="max-height: 300px; overflow: auto; border: 1px solid black; position: relative;">
    <p #info style="position: sticky; top: 0; margin: 0; margin-left: 150px; padding: 0.5rem;"></p>
    <div style="height: 2000px; padding-top: 800px;">
      <img
        (ngContainerIntersection)="handleIntersection($event, info)"
        [ngContainerIntersectionOptions]="{threshold: 1, root: rootEl}"
        style="width: 200px; height: 100px; border-radius: 20px;"
        src="art.jpg"
      />
    </div>
  </div>

  <br/>
  <code>Options: {{'{'}} rootMargin: '200px', root: rootEl{{ '}' }}</code>
  <div #rootElrootMargin style="max-height: 300px; overflow: auto; border: 1px solid black; position: relative;">
    <p #infoRootMargin style="position: sticky; top: 0; margin: 0; margin-left: 150px; padding: 0.5rem;"></p>
    <div style="height: 2000px; padding-top: 800px;">
      <img
        (ngContainerIntersection)="handleIntersection($event, infoRootMargin, true)"
        [ngContainerIntersectionOptions]="{rootMargin: '200px', root: rootElrootMargin}"
        style="width: 200px; height: 100px; border-radius: 20px;"
        src="art.jpg"
      />
    </div>
  </div>

  <!--
  handleIntersection: (
    event: IntersectionObserverEntry,
    target: HTMLElement,
    rootMargin?: boolean
  ) => {
    console.log(event);
    if (event.isIntersecting) {
      target.style.background = 'lightgreen';
      target.innerHTML = rootMargin ? 'Near to view' : 'Fully Visible';
    } else {
      target.style.background = '#ff8787';
      target.innerHTML = rootMargin
        ? 'Out of view'
        : 'Hidden or Partially Visible';
    }
  }
  -->
  `,
});

WithOptions.args = {
  console: console,
  ngContainerIntersectionOptions: undefined,
};

WithOptions.argTypes={
  ngContainerIntersectionOptions: {
    control: false
  }
}
