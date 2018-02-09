import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-request-bus',
  templateUrl: './request-bus.component.html',
  styleUrls: ['./request-bus.component.css']
})
export class RequestBusComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  public register(model) {
    console.log(model);
  }
    private buildForm(): void {
      this.registerForm = this._formBuilder.group({
        'gid': ['', [Validators.required]],
        'emp_name': ['', [Validators.required]],
        'gender': ['', [Validators.required]],
        'journeycity': ['', [Validators.required]],
        'journeylocation': ['', [Validators.required]],
        'ContactNumber': ['', [Validators.required]],
        /* 'ticket_type': ['', [Validators.required]],
        'Route No': ['', [Validators.required]],
        'Pickup Point': ['', [Validators.required]] */
      });
  }

}
