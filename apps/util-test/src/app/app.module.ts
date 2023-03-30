import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSkeletonModule } from 'ng-util-directive';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgSkeletonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
