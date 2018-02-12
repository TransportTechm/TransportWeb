import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RequestBusComponent } from './request-bus/request-bus.component';
import { ViewAvailabilityComponent } from './view-availability/view-availability.component';
import { RequestBusService } from './services/request-bus.service';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { CancelRequestComponent } from './cancel-request/cancel-request.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule
  ],
  declarations: [RequestBusComponent, ViewAvailabilityComponent, ViewHistoryComponent, CancelRequestComponent],
  providers: [
    RequestBusService
  ]
})
export class EmployeeModule { }
