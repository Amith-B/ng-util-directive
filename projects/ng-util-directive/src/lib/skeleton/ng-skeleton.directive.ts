import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngSkeleton]',
})
export class NgSkeletonDirective {
  /**
   * If `true` this shows skeleton loader in place of dom element.
   * It will take the height and width of the dom element
   */
  @Input() ngSkeleton = false;

  constructor() {}
}
