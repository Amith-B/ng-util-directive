import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSkeletonComponent } from './ng-skeleton.component';
import { NgSkeletonDirective } from './ng-skeleton.directive';
import { NgSkeletonShinyLoaderComponent } from './loaders/shiny-loader.component';

@NgModule({
  declarations: [
    NgSkeletonDirective,
    NgSkeletonShinyLoaderComponent,
    NgSkeletonComponent,
  ],
  imports: [CommonModule],
  exports: [
    NgSkeletonDirective,
    NgSkeletonShinyLoaderComponent,
    NgSkeletonComponent,
  ],
})
export class NgSkeletonModule {}
