import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { PagerService } from '../../shared/services/pager.service';



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
  constructor(private http: Http, private _formBuilder: FormBuilder, private vendorService: VendorService, private pagerService: PagerService) { }

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
  }

  public register(model) {
    console.log(model);
    this.vendorService.saveDriverRegistration(model).subscribe((driverRegister) => {
      console.log('Driver Registered');
      console.log(driverRegister);
      window.location.reload();
    }, err => {
      console.error('*** DriverComponent:Error while Registering');
      console.error(err);
      alert(err);
      window.location.reload();
    });
  }

  private getDriverList() {
    this.vendorService.getDriverList().subscribe(driverList => {
      this.driverList = driverList;
      // initialize to page 1
      this.setPage(1);
      console.log(this.driverList);
    },
      err => {
        console.error('*** RequestBusComponent: Error while getJourneyCity', err);
        console.error(err);
      }
    );
  }
  setPage(page: number) {
    console.log(this.pager.totalPages);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.driverList.length, page);
    console.log(this.pager);
    // get current page of items
    this.pagedItems = this.driverList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  reload() {
    window.location.reload();
  }

}
