import {
  Directive,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[containerResize]',
})
export class NgDebounceEventDirective implements OnChanges, OnDestroy {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}
}
