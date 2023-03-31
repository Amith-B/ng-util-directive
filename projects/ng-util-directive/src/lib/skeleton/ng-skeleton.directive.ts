import {
  AfterViewInit,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
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

  /**
   * If `true` the dom element get hidden with visibility: hidden
   */
  @Input() ngSkeletonHideOnLoading = true;

  constructor(
    private tpl: TemplateRef<unknown>,
    private vcr: ViewContainerRef
  ) {}

  ngContentNodes?: any[];
  componentRef!: ComponentRef<NgSkeletonComponent>;
  ngAfterViewInit(): void {
    this.ngContentNodes = this.tpl.createEmbeddedView({}).rootNodes;
    this.componentRef = this.vcr.createComponent(NgSkeletonComponent, {
      projectableNodes: [this.ngContentNodes],
    });

    this.updateInputs();
    this.handleNodeVisibility();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateInputs();
    if (changes['ngSkeleton']) {
      this.handleNodeVisibility();
    }
  }

  handleNodeVisibility(): void {
    if (this.ngSkeletonHideOnLoading && this.ngContentNodes) {
      this.ngContentNodes.forEach((node: HTMLElement) => {
        node.style.visibility = this.ngSkeleton ? 'hidden' : 'visible';
      });
    }
  }

  updateInputs(): void {
    if (this.componentRef) {
      this.componentRef.setInput('loading', this.ngSkeleton);
      this.componentRef.setInput('loaderComponent', this.ngSkeletonComponent);
      this.componentRef.setInput('data', this.ngSkeletonData);
    }
  }
}
