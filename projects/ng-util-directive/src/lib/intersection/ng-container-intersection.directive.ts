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
  selector: '[containerIntersection]',
})
export class NgContainerIntersectionDirective
  implements AfterViewInit, OnDestroy, OnChanges
{
  /**
   * Options for IntersectionObserver
   * `{ root?: Element | Document | null; rootMargin?: string; threshold?: number | number[]; }`
   */
  @Input() containerIntersectionOptions?: IntersectionObserverInit;
  /**
   * An output event which emits `IntersectionObserverEntry` for the the dom element on which this directive is used.
   * This directive uses `IntersectionObserver` internally and disconnects the observer when view is destroyed
   */
  @Output() containerIntersection =
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
        this.containerIntersection.emit(entry);
      }, this.containerIntersectionOptions);
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
