import { Component } from '@angular/core';

@Component({
  selector: 'util-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'util-test';

  loading = true;

  skeletonData = 1;

  handleToggle(): void {
    this.loading = !this.loading;
  }

  updateSkeletonData(): void {
    this.skeletonData = ++this.skeletonData;
  }
}
