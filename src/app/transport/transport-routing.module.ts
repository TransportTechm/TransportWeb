import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteListComponent } from './transport/route-list/route-list.component';

const routes: Routes = [ {
  path: '',
  children: [
    {path: 'routelist', component: RouteListComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
