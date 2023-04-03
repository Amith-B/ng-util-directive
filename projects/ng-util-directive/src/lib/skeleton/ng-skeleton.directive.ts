import {
  AfterViewInit,
  ComponentRef,
  Directive,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { NgSkeletonComponent } from './ng-skeleton.component';
import {
  NgSkeletonShinyLoaderComponent,
  ShinyLoaderData,
} from './loaders/shiny-loader.component';

export const GLOBAL_SKELETON_LOADER_COMPONENT = new InjectionToken<
  Type<unknown>
>('SKELETON_LOADER_COMPONENT');

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
   * `ShinyLoaderData` - default type
   */
  @Input() ngSkeletonData: ShinyLoaderData | unknown;

  /**
   * If `true` the dom element will be hidden with visibility: hidden
   */
  @Input() ngSkeletonHideOnLoading = true;

  constructor(
    private tpl: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    @Optional()
    @Inject(GLOBAL_SKELETON_LOADER_COMPONENT)
    globalLoaderComponent: Type<unknown>
  ) {
    if (globalLoaderComponent) {
      this.ngSkeletonComponent = globalLoaderComponent;
    }
  }

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
