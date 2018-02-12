import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from '../shared/start/start.component';
import { RequestBusComponent } from './request-bus/request-bus.component';
import { ViewAvailabilityComponent } from './view-availability/view-availability.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { CancelRequestComponent } from './cancel-request/cancel-request.component';

const employeeroutes: Routes = [
  {
    path: '',
    children: [
      {path: 'requestbus',component: RequestBusComponent},
      {path: 'availability',component: ViewAvailabilityComponent},
      {path: 'viewhistory',component: ViewHistoryComponent},
      {path: 'cancelrequest',component: CancelRequestComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeeroutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
