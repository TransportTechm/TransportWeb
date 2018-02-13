import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { RequestBusService } from '../services/request-bus.service';
@Component({
  selector: 'app-request-bus',
  templateUrl: './request-bus.component.html',
  styleUrls: ['./request-bus.component.css']
})
export class RequestBusComponent implements OnInit {

  public registerForm: FormGroup;
  public showme = false;
  public showgrid = false;
  public pick_up_point: any;
  public routes_list;
  public cities_list;
  public locations_list;
  public journeyType;
  public route_no;
  public origin;
  public destination;
  public departure_time;
  public error: string;
  public user_gender: string;
  public user_empId: number;
  public user_name: string;
  public user_contact: number;
  @ViewChild('form') myNgForm;
  constructor(private _formBuilder: FormBuilder, private http: Http, private requestBusService: RequestBusService) { }

  ngOnInit() {

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.user_gender = userData['data'][0]['gender'];
      this.user_empId = userData['data'][0]['emp_gid'];
      this.user_name = userData['data'][0]['first_name'] + '' + userData['data'][0]['last_name'];
      this.user_contact = userData['data'][0]['mobile_id'];
    }
    this.http.get('assets/apis/routes_list.json').subscribe(res => this.routes_list = res.json());
    this.http.get('assets/apis/cities.json').subscribe(res => this.cities_list = res.json());
    this.http.get('assets/apis/locations.json').subscribe(res => this.locations_list = res.json());
    this.http.get('assets/apis/JourneyType.json').subscribe(res => this.journeyType = res.json());
    this.buildForm();

  }
  togglepickpoint(pickpoint1) {
    this.pick_up_point = pickpoint1;
  }
  onSelect(selectedItem: any) {
    this.route_no = selectedItem.RouteNo;
    this.origin = selectedItem.Origin;
    this.destination = selectedItem.Destination;
    this.departure_time = selectedItem.DepartuteTime;
  }
  public register(model) {
    model.route_no = this.route_no;
    model.pick_up_point = this.pick_up_point;
    model.origin = this.origin;
    model.destination = this.destination;
    model.departure_time = this.departure_time;
    this.requestBusService.getRegisterCheck(model.gid).subscribe((register) => {
      if (register.status === 'success') {
        this.requestBusService.updateBusRegistration(model.gid, register.data[0].id, model).subscribe((newrequestbusWithId) => {
          alert('Configurations Route Updated successfully!');
        }, err => {
          console.error('*** LoginComponent: Error while logging', err);
          console.error(err);
          alert(err);
        });
      } else {
        this.requestBusService.saveBusRegistration(model.gid, model).subscribe((newrequestbusWithId) => {
          alert('Configurations saved successfully!');
        }, err => {
          console.error('*** LoginComponent: Error while logging', err);
          console.error(err);
          alert(err);
        });
      }
    }, err => {
      console.error('*** LoginComponent: Error while logging', err);
      console.error(err);
      alert(err);
    }
    );


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
      'gid': [this.user_empId, [Validators.required]],
      'emp_name': [this.user_name, [Validators.required]],
      'gender': [this.user_gender, [Validators.required]],
      'journeycity': ['', [Validators.required]],
      'journeylocation': ['', [Validators.required]],
      'ContactNumber': ['', [Validators.required]],
      'journey_type': ['', [Validators.required]],
      // 'Route_No': [this.RouteNo, [Validators.required]],
      // 'Pickup Point': ['', [Validators.required]]
    });
    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }


  private onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
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

  // tslint:disable-next-line:member-ordering
  formErrors = {
    'ContactNumber': ''
  };

  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'ContactNumber': {
      'required': 'Contact Number is required.',
    }
  };

}



