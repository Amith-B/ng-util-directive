import { Component } from '@angular/core';

@Component({
  selector: 'ng-skeleton',
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class NgSkeletonComponent {}
