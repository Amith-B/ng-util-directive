import { Component, Input, Type } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgSkeletonShinyLoaderComponent } from './loaders/shiny-loader.component';

@Component({
  selector: 'ng-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="ng-skeleton-content"
      [style.visibility]="loading ? 'hidden' : 'visible'"
    >
      <ng-content></ng-content>
    </div>
    <div class="ng-skeleton-loader" *ngIf="loading">
      <ng-container *ngComponentOutlet="loaderComponent"></ng-container>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        position: relative;
      }
      .ng-skeleton-loader {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 0.25rem;
        overflow: hidden;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      .ng-skeleton-content {
        display: contents;
      }
    `,
  ],
})
export class NgSkeletonComponent {
  /**
   * If `true` the ng content will be hidden
   */
  @Input() loading = false;

  /**
   * This can be used to show a custom component as a loader, by default the inbuilt `NgSkeletonDefaultLoaderComponent` component is rendered
   */
  @Input() loaderComponent: Type<unknown> = NgSkeletonShinyLoaderComponent;
}
