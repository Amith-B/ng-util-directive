import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[ngContainerIntersection]',
})
export class NgContainerIntersectionDirective
  implements AfterViewInit, OnDestroy, OnChanges
{
  /**
   * Options for IntersectionObserver
   * `{ root?: Element | Document | null; rootMargin?: string; threshold?: number | number[]; }`
   */
  @Input() ngContainerIntersectionOptions?: IntersectionObserverInit;
  /**
   * An output event which emits `IntersectionObserverEntry` for the the dom element on which this directive is used.
   * This directive uses `IntersectionObserver` internally and disconnects the observer when view is destroyed
   */
  @Output() ngContainerIntersection =
    new EventEmitter<IntersectionObserverEntry>();

  constructor(private el: ElementRef) {}

  private intersecObsRef?: IntersectionObserver;
  ngAfterViewInit(): void {
    this.handleIntersectionObserver();
  }

  ngOnChanges(): void {
    this.handleIntersectionObserver();
  }

  handleIntersectionObserver(): void {
    this.disconnectIntersectionObserver();

    if ('IntersectionObserver' in window) {
      this.intersecObsRef = new IntersectionObserver(([entry]) => {
        this.ngContainerIntersection.emit(entry);
      }, this.ngContainerIntersectionOptions);
      this.intersecObsRef.observe(this.el.nativeElement);
    }
  }

  disconnectIntersectionObserver(): void {
    if (this.intersecObsRef) {
      this.intersecObsRef.disconnect();
      this.intersecObsRef = undefined;
    }
  }

  ngOnDestroy(): void {
    this.disconnectIntersectionObserver();
  }
}
