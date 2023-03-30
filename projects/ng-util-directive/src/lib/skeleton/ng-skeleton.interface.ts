import { Directive, OnDestroy } from '@angular/core';

import { SkeletonService } from './ng-skeleton.service';
import { Subscription } from 'rxjs';

@Directive()
export abstract class NgSkeletonLoader implements OnDestroy {
  abstract handleDataChange(data: unknown): void;

  constructor(private skeletonService: SkeletonService) {
    this.subscribeToDataChange();
  }

  serviceSubscription?: Subscription;
  subscribeToDataChange(): void {
    this.serviceSubscription = this.skeletonService.dataObservable$.subscribe(
      (data) => {
        this.handleDataChange(data);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }
}
