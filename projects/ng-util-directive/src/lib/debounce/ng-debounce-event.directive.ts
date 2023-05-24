import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription, debounce, fromEvent, timer } from 'rxjs';

@Directive({
  selector: '[debounceEvent]',
})
export class NgDebounceEventDirective
  implements AfterViewInit, OnChanges, OnDestroy
{
  /**
   * The name of the event that needs to be listened on host element
   */
  @Input() debounceEventName: string = 'click';

  /**
   * Debounce timer in milliseconds
   */
  @Input() debounceEventTimer: number = 100;

  /**
   * Event emitted from host element
   */
  @Output() debounceEvent = new EventEmitter<unknown>();

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  private eventSubscription?: Subscription;
  registerEvent(): void {
    this.unregisterEvent();

    this.ngZone.runOutsideAngular(() => {
      this.eventSubscription = fromEvent(
        this.el.nativeElement,
        this.debounceEventName
      )
        .pipe(debounce(() => timer(this.debounceEventTimer)))
        .subscribe((event: unknown) => {
          this.ngZone.run(() => {
            this.debounceEvent.emit(event);
          });
        });
    });
  }

  unregisterEvent(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
      this.eventSubscription = undefined;
    }
  }

  ngAfterViewInit(): void {
    this.registerEvent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['debounceEventName'] &&
      !changes['debounceEventName'].firstChange
    ) {
      this.registerEvent();
    }
  }

  ngOnDestroy(): void {
    this.unregisterEvent();
  }
}
