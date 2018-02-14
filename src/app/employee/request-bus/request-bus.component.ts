import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { RequestBusService } from '../services/request-bus.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request-bus',
  templateUrl: './request-bus.component.html',
  styleUrls: ['./request-bus.component.css']
})
export class RequestBusComponent implements OnInit {

  public registerForm: FormGroup;
  public showme = false;
  public showgrid = false;
  public showdatepicker = false;
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
  public formSubmitAttempt: boolean;

  constructor(private _formBuilder: FormBuilder,
    private http: Http,
    private requestBusService: RequestBusService,
    private router: Router) { }

  ngOnInit() {

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      this.user_gender = userData['data'][0]['gender'];
      this.user_empId = userData['data'][0]['emp_gid'];
      this.user_name = userData['data'][0]['first_name'] + ' ' + userData['data'][0]['last_name'];
      this.user_contact = userData['data'][0]['mobile_id'];
    }
    this.http.get('assets/apis/routes_list.json').subscribe(res => this.routes_list = res.json());
    this.http.get('assets/apis/cities.json').subscribe(res => this.cities_list = res.json());
    this.http.get('assets/apis/locations.json').subscribe(res => this.locations_list = res.json());
    this.http.get('assets/apis/JourneyType.json').subscribe(res => this.journeyType = res.json());
    this.buildForm();

  }

  private buildForm(): void {
    this.registerForm = this._formBuilder.group({
      'gid': [this.user_empId],
      'emp_name': [this.user_name],
      'gender': [this.user_gender],
      'journeycity': ['', [Validators.required]],
      'journeylocation': ['', [Validators.required]],
      'ContactNumber': [this.user_contact, [Validators.required]],
      'journey_type': ['', [Validators.required]],
      'journey_date': [''],
      'route_no': [''],
      'pick_up_point': ['']
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
    'ContactNumber': '',
    'journeycity': '',
    'journeylocation': '',
    'journey_type': ''

  };

  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'ContactNumber': {
      'required': 'Contact Number is required.',
    },
    'journeycity': {
      'required': 'Select Journey City.',
    },
    'journeylocation': {
      'required': 'Select Journey Location.',
    },
    'journey_type': {
      'required': 'Select Journey Type.',
    }
  };


  togglepickpoint(pickpoint1) {
    this.pick_up_point = pickpoint1;
  }
  onSelect(selectedItem: any) {
    this.route_no = selectedItem.RouteNo;
    this.origin = selectedItem.Origin;
    this.destination = selectedItem.Destination;
    this.departure_time = selectedItem.DepartuteTime;
  }
  onSelectJourneyType(selectedItem: any) {
    if (selectedItem.id === 2) {
      this.showdatepicker = true;
    } else {
      this.showdatepicker = false;
    }
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

  public register(model) {
    // this.registerForm.markAsTouched({ onlySelf: true });
    if (this.registerForm.valid) {
      // save data
      model.route_no = this.route_no;
      model.pick_up_point = this.pick_up_point;
      model.origin = this.origin;
      model.destination = this.destination;
      model.departure_time = this.departure_time;
      console.log(model.journey_type);
      if (model.journey_type === 'Yearly Journey Ticket') {
        model.journey_type = 'Year';
        model.journey_date = null;
        this.requestBusService.getRegisterCheckYear(model.gid, model.journey_type).subscribe((register) => {
          console.log(register);
          if (register.status === 'success' && register.data.length > 0) {
            this.requestBusService.updateBusRegistration(model.gid, register.data[0].id, model).subscribe((newrequestbusWithId) => {
              alert('Route Updated successfully!');
              this.router.navigate(['/employee/viewhistory']);
            }, err => {
              console.error('Route Updation Failed', err);
              console.error(err);
              alert(err);
            });
          } else {
            this.requestBusService.saveBusRegistration(model.gid, model).subscribe((newrequestbusWithId) => {
              this.router.navigate(['/employee/viewhistory']);
            }, err => {
              console.error('Registration Failed', err);
              console.error(err);
              alert(err);
            });
          }
        }, err => {
          console.error('Error while Registering', err);
          console.error(err);
          alert(err);
        }
        );

      } else {
        model.journey_type = 'Single';
        this.requestBusService.getRegisterCheckSingle(model.gid, model.journey_type, model.journey_date).subscribe((register) => {
          console.log(register);
          if (register.status === 'success' && register.data.length > 0) {
            this.requestBusService.updateBusRegistration(model.gid, register.data[0].id, model).subscribe((newrequestbusWithId) => {
              this.router.navigate(['/employee/viewhistory']);
            }, err => {
              console.error('Route Updation Failed', err);
              console.error(err);
              alert(err);
            });
          } else {
            this.requestBusService.saveBusRegistration(model.gid, model).subscribe((newrequestbusWithId) => {
              this.router.navigate(['/employee/viewhistory']);
            }, err => {
              console.error('Registration Failed', err);
              console.error(err);
              alert(err);
            });
          }
        }, err => {
          console.error('Error while Registering', err);
          console.error(err);
          alert(err);
        }
        );
      }
    }
  }
}




