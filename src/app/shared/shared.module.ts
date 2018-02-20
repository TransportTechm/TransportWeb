import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedRoutingModule } from './shared-routing.module';
import { Error404Component } from './error404/error404.component';
import { NavComponent } from './nav/nav.component';
import { StartComponent } from './start/start.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginService } from './services/login/login.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { PagerService } from './services/pager.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    HttpModule,
    ToastModule.forRoot()
  ],
  declarations: [
    Error404Component,
    NavComponent,
    StartComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    HttpModule,
    ToastModule,
    Error404Component,
    NavComponent,
    StartComponent
  ],
  providers: [AuthGuard, LoginService, PagerService]
})
export class SharedModule { }
