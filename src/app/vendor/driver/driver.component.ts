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
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public driverForm: FormGroup;
  // array of all items to be paged
  driverList: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, private _formBuilder: FormBuilder, private vendorService: VendorService,
    private pagerService: PagerService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.buildForm();
    this.getDriverList();
  }
  private buildForm(): void {
    this.driverForm = this._formBuilder.group({
      'driname': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'mobile_number': ['', [Validators.required]],
      'license_number': ['', [Validators.required]]
    });
    this.driverForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  public onValueChanged(data?: any) {
    if (!this.driverForm) { return; }
    const form = this.driverForm;
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

  public formErrors = {
    'driname': '',
    'address': '',
    'mobile_number': '',
    'license_number': ''

  };

  // tslint:disable-next-line:member-ordering
  private validationMessages = {
    'driname': {
      'required': 'Driver Name is required.',
    },
    'address': {
      'required': 'Address is required',
    },
    'mobile_number': {
      'required': 'Mobile Number is required',
    },
    'license_number': {
      'required': 'License Number is required',
    }
  };

  public register(model) {
    // console.log(model);
    this.vendorService.saveDriverRegistration(model).subscribe((driverRegister) => {
      if (driverRegister.status == 201) {
        // alert('Driver Registered');
        this.driverForm.reset();
        this.toastr.success('Driver Registered Successfully', 'Success!');
        this.getDriverList();
      }
    }, err => {
      console.error('*** DriverComponent:Error while Registering Driver');
      console.error(err);
      alert(err);

    });
  }

  private getDriverList() {
    this.vendorService.getDriverList().subscribe(driverList => {
      this.driverList = driverList;
      // initialize to page 1
      this.setPage(1);
      // console.log(this.driverList);
    },
      err => {
        console.error('*** DriverComponent: Error while getDriverList', err);
        console.error(err);
      }
    );
  }
  setPage(page: number) {
    // console.log(this.pager.totalPages);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.driverList.length, page);
    // console.log(this.pager);
    // get current page of items
    this.pagedItems = this.driverList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
