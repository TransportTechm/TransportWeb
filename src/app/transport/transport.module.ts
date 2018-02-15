import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { RouteListComponent } from './transport/route-list/route-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransportRoutingModule
  ],
  declarations: [RouteListComponent]
})
export class TransportModule { }
