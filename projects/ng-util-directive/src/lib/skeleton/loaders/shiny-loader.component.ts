import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgSkeletonLoader } from '../ng-skeleton.interface';
import { SkeletonService } from '../ng-skeleton.service';
import { ShinyLoaderData } from './shiny-loader.model';

@Component({
  selector: 'shiny-loader',
  template: `
    <div
      class="shiny-skeleton"
      [ngStyle]="loaderStyle"
      [style]="'--shiny-bg-side: ' + color1 + ';--shiny-bg-center: ' + color2"
    ></div>
  `,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgSkeletonShinyLoaderComponent
  extends NgSkeletonLoader
  implements OnInit
{
  constructor(
    skeletonService: SkeletonService,
    private cdr: ChangeDetectorRef
  ) {
    super(skeletonService);
  }

  loaderStyle: Record<string, string> = {};
  color1: string = '#ececea';
  color2: string = 'lightgrey';
  override handleDataChange(data: ShinyLoaderData): void {
    const shape = data?.shape;

    switch (shape) {
      case 'circle': {
        const size = data?.size || '1rem';
        this.loaderStyle = {
          borderRadius: '50%',
          width: size,
          height: size,
        };
        break;
      }
      case 'square': {
        const size = data?.size || '1rem';
        this.loaderStyle = {
          borderRadius: data?.borderRadius || '0.25rem',
          width: size,
          height: size,
        };
        break;
      }

      case 'rectangle': {
        const width = data?.width || '1rem';
        const height = data?.height || '1rem';
        this.loaderStyle = {
          borderRadius: data?.borderRadius || '0.25rem',
          width,
          height,
        };
        break;
      }

      default: {
        this.loaderStyle = {
          borderRadius: data?.borderRadius || '0.25rem',
        };
        break;
      }
    }

    if (data && data.loaderColor1 && data.loaderColor2) {
      this.color1 = data.loaderColor1;
      this.color2 = data.loaderColor2;
    }

    this.cdr.detectChanges();
  }
}
export * from './shiny-loader.model';
