import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[ngContainerResize]',
})
export class NgContainerResizeDirective implements AfterViewInit, OnDestroy {
  /**
   * An output event which emits `ResizeObserverEntry` for the the dom element on which this directive is used.
   * This directive uses `ResizeObserver` internally and disconnects the observer when view is destroyed
   */
  @Output() ngContainerResize = new EventEmitter<ResizeObserverEntry>();

  constructor(private el: ElementRef) {}

  private resObsRef?: ResizeObserver;
  ngAfterViewInit(): void {
    if ('ResizeObserver' in window) {
      this.resObsRef = new ResizeObserver(([entry]) => {
        this.ngContainerResize.emit(entry);
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
