import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Subject, Subscription, debounce, timer } from 'rxjs';

@Directive({
  selector: '[debounceEvent]',
})
export class NgDebounceEventDirective
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
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

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  private eventEmitterSubject = new Subject<unknown>();
  private $eventEmitterObs = this.eventEmitterSubject.asObservable();

  private emitterSubscription?: Subscription;
  ngOnInit() {
    this.emitterSubscription = this.$eventEmitterObs
      .pipe(debounce(() => timer(this.debounceEventTimer)))
      .subscribe((event) => {
        this.debounceEvent.emit(event);
      });
  }

  private dispose?: () => void;
  registerEvent(): void {
    this.disposeEvent();

    this.dispose = this.renderer.listen(
      this.el.nativeElement,
      this.debounceEventName,
      (event: unknown) => {
        this.eventEmitterSubject.next(event);
      }
    );
  }

  disposeEvent(): void {
    if (this.dispose) {
      this.dispose();
      this.dispose = undefined;
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
    this.eventEmitterSubject.complete();
    this.emitterSubscription?.unsubscribe?.();
    this.disposeEvent();
  }
}
