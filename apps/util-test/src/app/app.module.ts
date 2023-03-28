import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgSkeletonModule } from 'ng-util-directive';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgSkeletonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
