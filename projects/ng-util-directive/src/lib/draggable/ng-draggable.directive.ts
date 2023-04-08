import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[draggable]',
})
export class NgDraggableDirective {
  /**
   * When `true` the draggable element will move to either right or left of the screen after mouseleave event
   */
  @Input() draggableSticky = true;

  constructor(private el: ElementRef) {}
}
