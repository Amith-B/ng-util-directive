import {
  AfterViewInit,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { NgSkeletonComponent } from './ng-skeleton.component';
import { NgSkeletonShinyLoaderComponent } from './loaders/shiny-loader.component';

@Directive({
  selector: '[ngSkeleton]',
})
export class NgSkeletonDirective implements AfterViewInit, OnChanges {
  /**
   * If `true` this shows skeleton loader in place of dom element.
   * It will take the height and width of the dom element
   */
  @Input() ngSkeleton = false;

  /**
   * This can be used to show a custom component as a loader, by default the inbuilt `NgSkeletonDefaultLoaderComponent` component is rendered
   */
  @Input() ngSkeletonComponent: Type<unknown> = NgSkeletonShinyLoaderComponent;

  /**
   * This can be used to pass any object data to the skeleton component
   */
  @Input() ngSkeletonData: unknown;

  constructor(
    private tpl: TemplateRef<unknown>,
    private vcr: ViewContainerRef
  ) {}

  componentRef!: ComponentRef<NgSkeletonComponent>;
  ngAfterViewInit(): void {
    const ngContentNodes = this.tpl.createEmbeddedView({}).rootNodes;
    this.componentRef = this.vcr.createComponent(NgSkeletonComponent, {
      projectableNodes: [ngContentNodes],
    });

    this.updateInputs();
  }

  ngOnChanges(): void {
    this.updateInputs();
  }

  updateInputs(): void {
    if (this.componentRef) {
      this.componentRef.setInput('loading', this.ngSkeleton);
      this.componentRef.setInput('loaderComponent', this.ngSkeletonComponent);
      this.componentRef.setInput('data', this.ngSkeletonData);
    }
  }
}
