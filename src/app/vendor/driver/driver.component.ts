import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public driverForm: FormGroup;

  constructor(private http: Http, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm(): void {
    this.driverForm = this._formBuilder.group({
      'driverName': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'mobileNumber': ['', [Validators.required]],
      'licenseNumber': ['', [Validators.required]]
    });
  }

  public register(model) {
    console.log(model)
  }

}
