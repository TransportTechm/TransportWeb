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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    HttpModule
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
    Error404Component,
    NavComponent,
    StartComponent
  ],
  providers: [AuthGuard, LoginService]
})
export class SharedModule { }
