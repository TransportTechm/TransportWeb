import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TransportService } from './services/transport.service';
import { RouteListComponent } from './route-list/route-list.component';
import { ApproveVehicleComponent } from './approve-vehicle/approve-vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransportRoutingModule
  ],
  declarations: [RouteListComponent, ApproveVehicleComponent],
  providers: [
    TransportService
  ]
})
export class TransportModule { }
