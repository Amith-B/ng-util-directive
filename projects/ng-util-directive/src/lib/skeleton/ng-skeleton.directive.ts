import {
  AfterViewInit,
  ComponentRef,
  Directive,
  DoCheck,
  EmbeddedViewRef,
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
  selector: '[skeletonLoader]',
})
export class NgSkeletonDirective implements AfterViewInit, OnChanges, DoCheck {
  /**
   * If `true` this shows skeleton loader in place of dom element.
   * It will take the height and width of the dom element
   */
  @Input() skeletonLoader = false;

  /**
   * This can be used to show a custom component as a loader, by default the inbuilt `NgSkeletonDefaultLoaderComponent` component is rendered
   */
  @Input() skeletonLoaderComponent: Type<unknown> = NgSkeletonShinyLoaderComponent;

  /**
   * This can be used to pass any object data to the skeleton component
   * `ShinyLoaderData` - default type
   */
  @Input() skeletonLoaderData: ShinyLoaderData | unknown;

  /**
   * If `true` the dom element will be hidden with visibility: hidden
   */
  @Input() skeletonLoaderHideOnLoading = true;

  constructor(
    private tpl: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    @Optional()
    @Inject(GLOBAL_SKELETON_LOADER_COMPONENT)
    globalLoaderComponent: Type<unknown>
  ) {
    if (globalLoaderComponent) {
      this.skeletonLoaderComponent = globalLoaderComponent;
    }
  }

  ngContentNodes?: any[];
  componentRef!: ComponentRef<NgSkeletonComponent>;
  templateEmbeddedView?: EmbeddedViewRef<any>;
  ngAfterViewInit(): void {
    this.templateEmbeddedView = this.tpl.createEmbeddedView({});
    this.ngContentNodes = this.templateEmbeddedView.rootNodes;
    this.componentRef = this.vcr.createComponent(NgSkeletonComponent, {
      projectableNodes: [this.ngContentNodes],
    });

    this.updateInputs();
    this.handleNodeVisibility();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateInputs();
    if (changes['skeletonLoader']) {
      this.handleNodeVisibility();
    }
  }

  ngDoCheck(): void {
    this.templateEmbeddedView?.detectChanges?.();
  }

  handleNodeVisibility(): void {
    if (this.skeletonLoaderHideOnLoading && this.ngContentNodes) {
      this.ngContentNodes.forEach((node: HTMLElement) => {
        node.style.visibility = this.skeletonLoader ? 'hidden' : 'visible';
      });
    }
  }

  updateInputs(): void {
    if (this.componentRef) {
      this.componentRef.setInput('loading', this.skeletonLoader);
      this.componentRef.setInput('loaderComponent', this.skeletonLoaderComponent);
      this.componentRef.setInput('data', this.skeletonLoaderData);
    }
  }
}
