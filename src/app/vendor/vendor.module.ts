import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { DriverComponent } from './driver/driver.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VendorService } from './services/vendor.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VendorRoutingModule
  ],
  declarations: [DriverComponent, VehicleComponent],
  providers: [VendorService]
})
export class VendorModule { }
