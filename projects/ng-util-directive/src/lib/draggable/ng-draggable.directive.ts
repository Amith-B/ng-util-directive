import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[draggable]',
})
export class NgDraggableDirective {
  /**
   * When `true` the draggable element will move to either right or left of the screen after mouseleave event
   */
  @Input() draggableSticky = true;

  /**
   * Can be used to change the sticky transition, default `left 0.3s ease`
   */
  @Input() draggableStickyTransition = 'left 0.3s ease';

  /**
   * You can add a margin to the sticky positions when the host sticks to left or right of screen, default - `0px`
   */
  @Input() draggableStickyMargins = '0px';

  @HostBinding('style.cursor') pointer = 'move';
  @HostBinding('style.--webkit-user-drag') userDrag = 'none';

  @HostBinding('style.transition') transition?: string;

  @HostBinding('style.touch-action')
  touchAction?: string;
  @HostBinding('style.user-select') userSelect?: string;
  @HostBinding('style.position') position?: string;
  @HostBinding('style.top') top?: string;
  @HostBinding('style.left') left?: string;

  private dragging = false;
  private initialOffsetX = 0;
  private initialOffsetY = 0;
  @HostListener('pointerdown', ['$event']) handlePointDown(
    event: PointerEvent
  ): void {
    this.dragging = true;
    this.initialOffsetX = event.offsetX;
    this.initialOffsetY = event.offsetY;
    this.transition = undefined;
  }
  @HostListener('window:pointermove', ['$event'])
  handlePointMove(event: PointerEvent): void {
    if (this.dragging) {
      this.touchAction = 'none';
      this.userSelect = 'none';

      const left = event.clientX - this.initialOffsetX;
      const top = event.clientY - this.initialOffsetY;

      this.top = `${top}px`;
      this.left = `${left}px`;
    }
  }
  @HostListener('pointerup', ['$event']) handlePointUp(
    event: PointerEvent
  ): void {
    this.dragging = false;
    this.touchAction = undefined;
    this.userSelect = undefined;
    this.transition = this.draggableStickyTransition || 'left 0.3s ease';

    if (!this.draggableSticky) {
      return;
    }

    const item = event.target as HTMLElement;
    const clientRect = item?.getBoundingClientRect?.();

    if (clientRect) {
      const itemMidPoint = clientRect.left + clientRect.width / 2;

      const windowMidpoint = window.innerWidth / 2;

      const direction = windowMidpoint < itemMidPoint ? 'right' : 'left';

      if (direction === 'right') {
        this.left = `calc(${window.innerWidth - clientRect.width}px - ${
          this.draggableStickyMargins || '0px'
        })`;
      } else {
        this.left = this.draggableStickyMargins || '0px';
      }
    }
  }
}
