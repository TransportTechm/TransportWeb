import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RequestBusService } from '../services/request-bus.service';

@Component({
  selector: 'app-request-bus',
  templateUrl: './request-bus.component.html',
  styleUrls: ['./request-bus.component.css']
})
export class RequestBusComponent implements OnInit {

  public registerForm: FormGroup;
  public showme: boolean = false;
  public showgrid: boolean = false;
  public pick_up_point: any;
  public routes_list;
  public route_no;
  public origin;
  public destination
  public departure_time;
  public error: string;
  @ViewChild('form') myNgForm;
  constructor(private _formBuilder: FormBuilder, private http: Http, private requestBusService: RequestBusService) { }

  ngOnInit() {
    this.http.get('assets/apis/routes_list.json').subscribe(res => this.routes_list = res.json());
    this.buildForm();

  }
  togglepickpoint(pickpoint1) {
    this.pick_up_point = pickpoint1;
  }
  onSelect(selectedItem: any) {
    this.route_no = selectedItem.RouteNo;
    this.origin = selectedItem.Origin
    this.destination = selectedItem.Destination;
    this.departure_time = selectedItem.DepartuteTime;
  }
  public register(model) {
    model.route_no = this.route_no;
    model.pick_up_point = this.pick_up_point;
    model.origin = this.origin;
    model.destination = this.destination;
    model.departure_time = this.departure_time;
    //this.regID = this.getRegisterCheck(model.gid);
    this.requestBusService.getRegisterCheck(model.gid).subscribe((register) => {
      if (register[0].id) {

        this.requestBusService.updateBusRegistration(model.gid, register[0].id, model).subscribe((newrequestbusWithId) => {
          console.log(newrequestbusWithId)
        }, (response: Response) => {
          if (response.status === 500) {
            this.error = 'errorHasOcurred';
            console.log(response);
          }
        });
      }
      else {
        this.requestBusService.saveBusRegistration(model.gid, model).subscribe((newrequestbusWithId) => {
          console.log(newrequestbusWithId)
        }, (response: Response) => {
          if (response.status === 500) {
            this.error = 'errorHasOcurred';
            console.log(response);
          }
        });
      }
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
        console.log(response);
      }

    });


  }
  showpanel() {
    this.showme = true;
  }
  reset() {
    this.showme = false;
  }
  showthegrid() {
    this.showgrid = true;
  }
  
  private buildForm(): void {
    this.registerForm = this._formBuilder.group({
      'gid': ['345548', [Validators.required]],
      'emp_name': ['Partha Saradhi Gajula', [Validators.required]],
      'gender': ['Male', [Validators.required]],
      'journeycity': ['', [Validators.required]],
      'journeylocation': ['', [Validators.required]],
      'ContactNumber': ['', [Validators.required]],
      'journey_type': ['', [Validators.required]],
      //'Route_No': [this.RouteNo, [Validators.required]],
      // 'Pickup Point': ['', [Validators.required]]
    });
  }
}


