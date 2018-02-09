import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full'},
    { path: '', loadChildren: './shared/shared.module#SharedModule',canActivate: [AuthGuard] },
    { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule',data: { preload: true },canActivate: [AuthGuard]},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'error', component:  Error404Component},
    { path: '**', redirectTo: 'error', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
