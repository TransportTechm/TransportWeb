import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteListComponent } from './transport/route-list/route-list.component';
import { ApproveVehicleComponent } from './transport/approve-vehicle/approve-vehicle.component';

const routes: Routes = [ {
  path: '',
  children: [
    {path: 'routelist', component: RouteListComponent},
    {path: 'approvevehicle', component: ApproveVehicleComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
