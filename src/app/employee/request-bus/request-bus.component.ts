import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-request-bus',
  templateUrl: './request-bus.component.html',
  styleUrls: ['./request-bus.component.css']
})
export class RequestBusComponent implements OnInit {
  public registerForm: FormGroup;
  public routes_list : [{
    RouteNo: string,
    Origin : string,
    Destination : string,
    DepartuteTime : string,
    PickupPoint: any
}];
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.routes_list = [{
      RouteNo: "1",
      Origin : "TMEC",
      Destination : "Nagalanda Circle",
      DepartuteTime : "8:50 AM",
      PickupPoint: ["Nagalanda Junction", "Madiwala", "Silk Board"]
  },
  {
      RouteNo: "2",
      Origin : "TMEC",
      Destination : "Konappana Agrahara",
      DepartuteTime : "9:30 AM",
      PickupPoint: ["Ecity", "BTM", "sarjapur"]
  }]

  }
  public register(model) {
    console.log(model);
  }
    private buildForm(): void {
      this.registerForm = this._formBuilder.group({
        'gid': ['4900', [Validators.required]],
        'emp_name': ['', [Validators.required]],
        'gender': ['', [Validators.required]],
        'journeycity': ['', [Validators.required]],
        'journeylocation': ['', [Validators.required]],
        'ContactNumber': ['', [Validators.required]],
        'ticket_type': ['', [Validators.required]],
        // 'Route No': ['', [Validators.required]],
        // 'Pickup Point': ['', [Validators.required]]
      });
  }
}
  

