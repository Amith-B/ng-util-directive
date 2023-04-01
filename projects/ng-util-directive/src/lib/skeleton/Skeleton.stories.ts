import { Story, Meta } from '@storybook/angular/types-6-0';
import { NgSkeletonModule } from './ng-skeleton.module';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Directives/NgSkeleton',
  decorators: [
    moduleMetadata({
      imports: [NgSkeletonModule],
    }),
  ],
  argTypes: {
    ngSkeleton: {
      description:
        'If `true` this shows skeleton loader in place of dom element. It will take the height and width of the dom element',
      control: 'boolean',
      defaultValue: { summary: false },
    },
    data: {
      description:
        'This can be used to pass any object data to the skeleton component. <br/>You can use your own Skeleton component with `component` prop',
      control: 'object',
      defaultValue: { summary: 'ShinyLoaderData' },
    },
    hideOnLoading: {
      description:
        'If `true` the dom element will be hidden with visibility: hidden',
      control: 'boolean',
    },
    component: {
      description:
        'This can be used to show a custom component as a loader, by default the inbuilt `NgSkeletonDefaultLoaderComponent` component is rendered',
      defaultValue: { summary: 'NgSkeletonShinyLoaderComponent' },
    },
  },
} as Meta;

type DirectiveType = {
  ngSkeleton: boolean;
  data: unknown;
  hideOnLoading: boolean;
  component: ThisType<unknown>;
};

export const BasicFullSize: Story<DirectiveType> = (args: DirectiveType) => ({
  props: args,
  template: `
  <h1 style="min-width: 120px; min-height: 40px" *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading">
    Heading
  </h1>

  <p style="min-width: 250px; min-height: 20px" *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading">
    First paragraph with some content
  </p>

  <p style="min-width: 250px; min-height: 20px" *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading">
    Second paragraph with some content
  </p>
  `,
});

BasicFullSize.args = {
  ngSkeleton: true,
  data: {
    shape: 'fullSize',
  },
  hideOnLoading: true,
};

export const Circle: Story<DirectiveType> = (args: DirectiveType) => ({
  props: args,
  template: `
  <img
    *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading"
    style="width: 100px; height: 100px; border-radius: 50%;"
    src="avatar.svg"
  />
  <!-- Usage: 
  <img
    (load)="ngSkeleton = false"
    *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading"
    style="width: 100px; height: 100px; border-radius: 50%;"
    src="avatar.svg"
  />
  -->
  `,
});

Circle.args = {
  ngSkeleton: true,
  data: {
    shape: 'circle',
    size: '100px',
  },
  hideOnLoading: true,
};

export const Square: Story<DirectiveType> = (args: DirectiveType) => ({
  props: args,
  template: `
    <img  *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading" style="width: 200px; height: 200px; border-radius: 20px;" src="art.jpg"/>
    <!-- Usage: <img (load)="ngSkeleton = false" *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading" style="width: 100%; height: 100%; border-radius: 50%;" src="art.jpg"/>-->
  `,
});

Square.args = {
  ngSkeleton: true,
  data: {
    shape: 'square',
    size: '200px',
    borderRadius: '20px',
  },
  hideOnLoading: true,
};

export const CustomColor: Story<DirectiveType> = (args: DirectiveType) => ({
  props: args,
  template: `
    <img  *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading" style="width: 200px; height: 200px; border-radius: 20px;" src="art.jpg"/>
    <!-- Usage: <img (load)="ngSkeleton = false" *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading" style="width: 100%; height: 100%; border-radius: 50%;" src="art.jpg"/>-->
  `,
});

CustomColor.args = {
  ngSkeleton: true,
  data: {
    shape: 'square',
    size: '200px',
    borderRadius: '20px',
    loaderColor1: '#343434',
    loaderColor2: '#404040',
  },
  hideOnLoading: true,
};

export const Rectangle: Story<DirectiveType> = (args: DirectiveType) => ({
  props: args,
  template: `
  <img  *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading" style="width: 400px; height: 200px; border-radius: 20px;" src="art.jpg"/>
  <!-- Usage: <img (load)="ngSkeleton = false" *ngSkeleton="ngSkeleton; data: data; hideOnLoading: hideOnLoading" style="width: 400px; height: 200px; border-radius: 50%;" src="art.jpg"/>-->

  `,
});

Rectangle.args = {
  ngSkeleton: true,
  data: {
    shape: 'rectangle',
    width: '400px',
    height: '200px',
    borderRadius: '20px',
  },
  hideOnLoading: true,
};
