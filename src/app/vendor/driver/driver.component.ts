import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public driverForm: FormGroup;
  public driverList;

  constructor(private http: Http, private _formBuilder: FormBuilder, private vendorService: VendorService) { }

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
    console.log(model)
    this.vendorService.saveDriverRegistration(model).subscribe((driverRegister) => {
      console.log("Driver Registered");
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
      console.log(this.driverList);
    },
      err => {
        console.error('*** RequestBusComponent: Error while getJourneyCity', err);
        console.error(err);
      }
    );
  }

  reload(){
    window.location.reload();
  }

}
