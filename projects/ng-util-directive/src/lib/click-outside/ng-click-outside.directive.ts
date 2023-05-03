import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class NgClickOutsideDirective {
  /**
   * An output event which emits click event when clicked outside of the host element
   */
  @Output() clickOutside = new EventEmitter<PointerEvent>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event']) handleClick(
    event: PointerEvent
  ): void {
    if (
      this.el.nativeElement &&
      !(this.el.nativeElement as HTMLElement).contains(
        event.target as HTMLElement
      )
    ) {
      this.clickOutside.emit(event);
    }
  }
}
