import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  public vehicleForm: FormGroup;

  constructor(private http: Http, private _formBuilder: FormBuilder, private vendorService: VendorService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.vehicleForm = this._formBuilder.group({
      'regNumber': ['', [Validators.required]],
      'vehicleType': ['', [Validators.required]],
      'driver': ['', [Validators.required]],
      'verificationStatus': ['', [Validators.required]]
    });
  }

}
