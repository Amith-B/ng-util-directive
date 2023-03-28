import { NgModule } from '@angular/core';
import { NgSkeletonComponent } from './ng-skeleton.component';
import { NgSkeletonDirective } from './ng-skeleton.directive';

@NgModule({
  declarations: [NgSkeletonDirective, NgSkeletonComponent],
  imports: [],
  exports: [NgSkeletonDirective],
})
export class NgSkeletonModule {}
