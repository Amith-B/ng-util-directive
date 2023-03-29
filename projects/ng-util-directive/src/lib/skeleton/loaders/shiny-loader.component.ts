import { Component } from '@angular/core';

@Component({
  selector: 'shiny-loader',
  standalone: true,
  template: ` <div>Loading...</div> `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
        background-color: red; /* to be removed */
      }
    `,
  ],
})
export class NgSkeletonShinyLoaderComponent {}
