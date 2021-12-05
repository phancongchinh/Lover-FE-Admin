import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutWithSharedComponent} from './layout-with-shared/layout-with-shared.component';
import {AppModule} from '../app.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LayoutWithSharedComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule {
}
