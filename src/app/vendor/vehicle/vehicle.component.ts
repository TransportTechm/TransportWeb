import { Component, OnInit, ViewChild, NgModule, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { PagerService } from '../../shared/services/pager.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  public vehicleForm: FormGroup;
  public driverList;
  public vehicleTypeList;
  public regNo;
  public DId;
  public VId;
  public vehicleList;
  pager: any = {};
  pagedItems: any[];
  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, private _formBuilder: FormBuilder, private vendorService: VendorService,
    private pagerService: PagerService, public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.buildForm();
    this.getDriverList();
    this.getVehicleTypeList();
    this.getVehicleList();
  }
  private buildForm(): void {
    this.vehicleForm = this._formBuilder.group({
      'vehicleRegNo': ['', [Validators.required]],
      'vehicleTypeId': ['', [Validators.required]],
      'driverId': ['', [Validators.required]],
    });
    this.vehicleForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  public onValueChanged(data?: any) {
    if (!this.vehicleForm) { return; }
    const form = this.vehicleForm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  // tslint:disable-next-line:member-ordering
  public formErrors = {
    'vehicleRegNo': '',
    'vehicleTypeId': '',
    'driverId': ''
  };

  // tslint:disable-next-line:member-ordering
  private validationMessages = {
    'vehicleRegNo': {
      'required': 'Registration Number is required.',
    },
    'vehicleTypeId': {
      'required': 'Vehicle Type is required',
    },
    'driverId': {
      'required': 'Driver Name is required',
    }
  };

  public register(model) {
    model.verificationStatus = 'Pending';
    // console.log(model);
    this.vendorService.saveVehicleRegistration(model).subscribe((vehicleRegister) => {
      // alert('Vehicle Registered');
      if (vehicleRegister.status === 201) {
        // alert('Vehicle Registered');
        this.vehicleForm.reset();
        this.toastr.success('Vehicle Registered Successfully', 'Success!');
        this.getVehicleList();
      }
      // console.log(vehicleRegister)
    }, err => {
      console.error('*** VehicleComponent:Error while Registering');
      console.error(err);
      // alert(err);
      this.toastr.error(err, 'Error!')
    });
  }
  private getDriverList() {
    this.vendorService.getDriverList().subscribe(driverList => {
      this.driverList = driverList;
      // console.log(this.driverList);
    },
      err => {
        console.error('*** VehicleComponent: Error while getDriverList', err);
        console.error(err);
        this.toastr.error(err, 'Error!')
      }
    );
  }
  private getVehicleTypeList() {
    this.vendorService.getVehicleTypeList().subscribe(vehicleList => {
      this.vehicleTypeList = vehicleList;
      // console.log(this.vehicleTypeList);
    },
      err => {
        console.error('*** VehicleComponent: Error while getVehicleTypeList', err);
        console.error(err);
        this.toastr.error(err, 'Error!')
      }
    );
  }

  private getVehicleList() {
    this.vendorService.getVehicleList().subscribe(vehicleList => {
      this.vehicleList = vehicleList;
      this.setPage(1);
      // console.log(this.vehicleList);
    },
      err => {
        console.error('*** VehicleComponent: Error while getVehicleList', err);
        console.error(err);
        this.toastr.error(err, 'Error!')
      }
    );
  }
  setPage(page: number) {
    // console.log(this.pager.totalPages);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.vehicleList.length, page);
    // console.log(this.pager);
    // get current page of items
    this.pagedItems = this.vehicleList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
