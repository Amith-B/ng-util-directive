import { Component } from '@angular/core';
import { NgSkeletonLoader } from '../ng-skeleton.interface';

@Component({
  selector: 'shiny-loader',
  standalone: true,
  template: ` <div class="shiny-skeleton"></div> `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      .shiny-skeleton {
        --shiny-bg-side: #ececea;
        --shiny-bg-center: lightgrey;
        width: 100%;
        height: 100%;
        animation-duration: 1000ms;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: loadingAnimation;
        animation-timing-function: cubic-bezier(0.35, 0, 0.5, 1);
        background-image: linear-gradient(
          to right,
          var(--shiny-bg-side) 8%,
          var(--shiny-bg-center) 18%,
          var(--shiny-bg-side) 33%
        );
        background-size: 200%;
      }

      @keyframes loadingAnimation {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
    `,
  ],
})
export class NgSkeletonShinyLoaderComponent extends NgSkeletonLoader {
  override handleDataChange(data: unknown): void {
    console.log(data);
  }
}

export type Circle = {
  shape: 'circle';
  size: string;
};

export type Square = {
  shape: 'square';
  size: string;
};

export type Rectangle = {
  shape: 'square';
  width: string;
  height: string;
};
