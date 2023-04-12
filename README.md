# ng-util-directive

### Installation

`npm i ng-util-directive`

### Requirements

Minimum angular version: `14.0.0`

### Available Directives

| Import                                                              | Description                                                                                                | Usage                                                                                                                                                                                               |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `import { NgSkeletonModule } from 'ng-util-directive'`              | A skeleton directive which shows as an overlay on top of the dom element                                   | `<img (load)="loading = false" *skeletonLoader="loading; data: {shape: 'circle', size: '100px' }; hideOnLoading: true" style="width: 100px; height: 100px; border-radius: 50%;" src="avatar.svg"/>` |
| `import { NgContainerResizeModule } from 'ng-util-directive'`       | A directive which emits the resize event for a container. Which internally uses ResizeObserver             | `<div (containerResize)="handleContainerResize($event)">Some Content </div>`                                                                                                                        |
| `import { NgContainerIntersectionModule } from 'ng-util-directive'` | A directive which emits the intersection event for a container. Which internally uses IntersectionObserver | `<div (containerIntersection)="handleContainerIntersection($event)" [containerIntersectionOptions]="{rootMargin: '-200px', threshold: 1, root: rootElement}">Some Content </div>`                   |
| `import { NgDraggableModule } from 'ng-util-directive'`             | A directive makes the host element draggable and makes it sticky to edges of screen                        | `<div draggable [draggableSticky]="true" draggableStickyMargins="1rem" draggableStickyTransition="left 0.3s ease" draggableTeleportTo="modal-container">Any content</div>`                          |
| `import { NgDebounceEventModule } from 'ng-util-directive'`         | A directive which emits the given event with a provided debounce                                           | `<input (debounceEvent)="handleEvent($event)" debounceEventName="input" [debounceEventTimer]="500" placeholder="Type something"/>`                                                                  |

# Storybook Demo

[Storybook Demo Link](https://ng-util-directive.vercel.app/ "Storybook Link")

<p>
 <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ng-util-directive.vercel.vercel.app/" alt="Storybook website link"/> 
</p>

# Stackblitz Demo

[Stackblitz Demo Link](https://stackblitz.com/edit/angular-fzwtn5?file=src/main.ts "Stackblitz Link")

<p>
 <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://stackblitz.com/edit/angular-fzwtn5?file=src/main.ts" alt=“Stackblitz website link"/> 
</p>
