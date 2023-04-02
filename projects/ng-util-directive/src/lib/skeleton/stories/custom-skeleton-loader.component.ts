import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { NgSkeletonLoader } from '../ng-skeleton.interface';

@Component({
  selector: 'percent-loader',
  standalone: true,
  imports: [NgStyle],
  template: ` <div class="percent-skeleton" [ngStyle]="loaderStyle"></div> `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      .percent-skeleton {
        height: calc(100% - 4px);
        border-radius: 20px;
        background-color: #00ffa194;
        transition: 0.5s cubic-bezier(0.35, 0, 0.5, 1);
      }
    `,
  ],
})
export class NgSkeletonPercentLoaderComponent extends NgSkeletonLoader {
  loaderStyle: Record<string, string> = {
    width: '0%',
  };

  handleDataChange(data: { percent: number }): void {
    const percent = data?.percent;

    this.loaderStyle = {
      width: `${percent}%`,
    };
  }
}
