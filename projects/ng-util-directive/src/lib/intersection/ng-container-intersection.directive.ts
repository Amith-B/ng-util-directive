import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[ngContainerIntersection]',
})
export class NgContainerIntersectionDirective implements AfterViewInit, OnDestroy {
  /**
   * An output event which emits `IntersectionObserverEntry` for the the dom element on which this directive is used.
   * This directive uses `IntersectionObserver` internally and disconnects the observer when view is destroyed
   */
  @Output() ngContainerIntersection = new EventEmitter<IntersectionObserverEntry>();

  constructor(private el: ElementRef) {}

  private resObsRef?: IntersectionObserver;
  ngAfterViewInit(): void {
    if ('IntersectionObserver' in window) {
      this.resObsRef = new IntersectionObserver(([entry]) => {
        this.ngContainerIntersection.emit(entry);
      });
      this.resObsRef.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resObsRef) {
      this.resObsRef.disconnect();
    }
  }
}
