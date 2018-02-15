import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { RouteListComponent } from './transport/route-list/route-list.component';
import { SharedModule } from '../shared/shared.module';
import { ApproveVehicleComponent } from './transport/approve-vehicle/approve-vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransportRoutingModule
  ],
  declarations: [RouteListComponent, ApproveVehicleComponent]
})
export class TransportModule { }
