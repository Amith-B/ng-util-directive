# NgUtilDirective

# ng-util-directive

### Installation

`npm i ng-util-directive`

This assumes that you are using angular project to consume this library.

### Import NgSkeletonModule module

`import { NgSkeletonModule } from 'ng-util-directive'`

### Usage

`<img (load)="loading = false" *ngSkeleton="loading; data: {shape: 'circle', size: '100px' }; hideOnLoading: true" style="width: 100px; height: 100px; border-radius: 50%;" src="avatar.svg" /> `

# Storybook Demo

[Storybook Demo Link](https://ng-util-directive.vercel.app/ "Storybook Link")
