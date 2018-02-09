import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-request-bus',
  templateUrl: './request-bus.component.html',
  styleUrls: ['./request-bus.component.css']
})
export class RequestBusComponent implements OnInit {
  public registerForm: FormGroup;
  public showme: boolean = false;
  public pickupPoint: any;
  public json1: JSON;
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
  togglepickpoint(pickpoint1){
    this.pickupPoint = pickpoint1;
  }
  onSelect(selectedItem: any) {
    console.log(selectedItem);
    console.log("Route No: ", selectedItem.RouteNo);
    console.log("Origin: ", selectedItem.Origin);
    console.log("Destination: ", selectedItem.Destination);
    console.log("Departure Time: ", selectedItem.DepartuteTime);
    console.log("Pickup/Drop Point: ", this.pickupPoint)
  }
  public register(model) {
    console.log(model);
  }
  showpanel(){
    this.showme = true;
  }
  reset() {
    this.showme = false;
  }

    private buildForm(): void {
      this.registerForm = this._formBuilder.group({
        'gid': ['4900', [Validators.required]],
        'emp_name': ['empname', [Validators.required]],
        'gender': ['male', [Validators.required]],
        'journeycity': ['', [Validators.required]],
        'journeylocation': ['', [Validators.required]],
        'ContactNumber': ['', [Validators.required]],
        'ticket_type': ['', [Validators.required]],
        'Route No': ['', [Validators.required]],
        // 'Pickup Point': ['', [Validators.required]]
      });
  }
  
}
  

