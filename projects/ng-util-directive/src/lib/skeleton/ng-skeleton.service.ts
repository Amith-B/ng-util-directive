import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SkeletonService {
  dataObservable$ = new BehaviorSubject<unknown>(undefined);
}
