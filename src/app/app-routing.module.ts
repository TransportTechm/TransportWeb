import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';


const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full'},
    { path: '', loadChildren: './shared/shared.module#SharedModule' },
    { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule',data: { preload: true }},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'error', component:  Error404Component},
    { path: '**', redirectTo: 'error', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
