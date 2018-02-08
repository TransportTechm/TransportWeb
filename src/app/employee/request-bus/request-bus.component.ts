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

    private buildForm(): void {
      this.registerForm = this._formBuilder.group({
        'Journey City': ['', [Validators.required]],
        'Journey Location': ['', [Validators.required]],
        'Contact Number': ['', [Validators.required]],
        'Journey Type': ['', [Validators.required]],
        'Route No': ['', [Validators.required]],
        'Pickup Point': ['', [Validators.required]]
      });
  }

}
