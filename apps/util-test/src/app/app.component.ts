import { Component } from '@angular/core';
import { ShinyLoaderData } from 'ng-util-directive';

@Component({
  selector: 'util-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'util-test';

  loading = true;

  skeletonData: ShinyLoaderData = { shape: 'fullSize' };

  handleToggle(): void {
    this.loading = !this.loading;
  }

  updateSkeletonData(shape: ShinyLoaderData['shape']): void {
    switch (shape) {
      case 'circle': {
        this.skeletonData = {
          shape: 'circle',
          size: '2rem',
        };
        break;
      }
      case 'square': {
        this.skeletonData = {
          shape: 'square',
          size: '2rem',
        };
        break;
      }

      case 'rectangle': {
        this.skeletonData = {
          shape: 'rectangle',
          width: '8rem',
          height: '2rem',
        };
        break;
      }

      default: {
        this.skeletonData = {
          shape: 'fullSize',
        };
        break;
      }
    }
  }
}
