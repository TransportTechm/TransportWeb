import { Component, OnInit, ViewChild, NgModule, ViewContainerRef} from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { RequestBusService } from '../services/request-bus.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
@Component({
  selector: 'app-request-bus',
  templateUrl: './request-bus.component.html',
  styleUrls: ['./request-bus.component.css']
})
export class RequestBusComponent implements OnInit {

  public registerForm: FormGroup;
  public showdatepicker = false;
  public pick_up_point: any;
  public routes_list;
  public cities_list = [];
  public locations_list = [];
  public journeyType = [];
  public route_no;
  public origin;
  public destination;
  public departure_time;
  public error: string;
  public user_gender: string;
  public user_empId: number;
  public user_name: string;
  public user_contact: number;
  public departures;


  constructor(private _formBuilder: FormBuilder,
    private http: Http,
    private requestBusService: RequestBusService,
    private router: Router,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.user_gender = userData['data'][0]['gender'];
      this.user_empId = userData['data'][0]['emp_gid'];
      this.user_name = userData['data'][0]['first_name'] + ' ' + userData['data'][0]['last_name'];
      this.user_contact = userData['data'][0]['mobile_id'];
    }
    this.buildForm();
    this.getJourneyCity();
    // this.toastr.success('You are awesome!', 'Success!');
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

  public onValueChanged(data?: any) {
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
  public formErrors = {
    'ContactNumber': '',
    'journeycity': '',
    'journeylocation': '',
    'journey_type': ''

  };

  // tslint:disable-next-line:member-ordering
  private validationMessages = {
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
  private getJourneyCity() {
    // this.http.get('assets/apis/cities.json').subscribe(res => this.cities_list = res.json());
    this.requestBusService.getJourneyCity(1).subscribe(cities => {
      this.cities_list = cities.cities;
    },
      err => {
        console.error('*** RequestBusComponent: Error while getJourneyCity', err);
        console.error(err);
      }
    );
  }
  onSelectCity(value) {
    console.log(value);
    this.getJourneyLocation(value);
  }
  private getJourneyLocation(value) {
    // this.http.get('assets/apis/locations.json').subscribe(res => this.locations_list = res.json());
    this.requestBusService.getJourneyLocation(value).subscribe(locations => {
      console.log(locations.locations);
      this.locations_list = locations.locations;
    },
      err => {
        console.error('*** RequestBusComponent: Error while getJourneyLocation', err);
        console.error(err);
      }
    );
  }
  onSelectLocation(value) {
    console.log(value);
    this.getJourneyType(value);
  }
  private getJourneyType(value) {
    // this.http.get('assets/apis/JourneyType.json').subscribe(res => this.journeyType = res.json());
    this.requestBusService.getJourneyType(value).subscribe(JourneyTypes => {
      console.log(JourneyTypes.journeyTypes);
      this.journeyType = JourneyTypes.journeyTypes;
    },
      err => {
        console.error('*** RequestBusComponent: Error while getJourneyType', err);
        console.error(err);
      }
    );
  }
  onSelectJourneyType(selectedItem: any) {
    console.log(selectedItem);
    if (selectedItem.name === 'Yearly Journey Ticket') {
      this.showdatepicker = false;
      this.getRouteList(selectedItem.id);
    } else {
      this.showdatepicker = true;
      this.getRouteList(selectedItem.id);
    }
  }
  private getRouteList(value) {
    //this.http.get('assets/apis/routes_list.json').subscribe(res => this.routes_list = res.json());
    this.requestBusService.getRoutesList(value).subscribe(routes_list => {
      console.log(routes_list);
      this.routes_list=routes_list;
    },
      err => {
        console.error('*** RequestBusComponent: Error while getJourneyType', err);
        console.error(err);
      }
    );
  }
  togglepickpoint(pickpoint1) {
    this.pick_up_point = pickpoint1;
  }
  onSelect(selectedItem: any) {
    console.log(selectedItem)
    this.route_no = selectedItem.routeNo;
    this.origin = selectedItem.origin;
    this.destination = selectedItem.destination;
    this.departure_time = selectedItem.departureTime;
  }
  showTimings(routeNo) {
    console.log(routeNo)
    this.routes_list.forEach(element => {
      if (element.routeNo === routeNo) {
        this.departures = element.bpoints;
        console.log(this.departures)
      }
    });
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
          if (register.status === 'success' && register.data.length > 0) {
            if (window.confirm('You are requesting to update route. Once processed, your data will be permanently updated.')) {
              // put your delete method logic here
              this.requestBusService.updateBusRegistration(model.gid, register.data[0].id, model).subscribe((newrequestbusWithId) => {
                // alert('Route Updated successfully!');
                this.toastr.success('Route Updated successfully!', 'Success!');
                this.router.navigate(['/employee/viewhistory']);
              }, err => {
                console.error('*** RequestBusComponent:Error while Registering');
                console.error(err);
                alert(err);
              });
            }
          } else {
            this.requestBusService.saveBusRegistration(model.gid, model).subscribe((newrequestbusWithId) => {
              this.toastr.success('Route Saved successfully!', 'Success!');
              this.router.navigate(['/employee/viewhistory']);
            }, err => {
              console.error('*** RequestBusComponent:Error while Registering');
                console.error(err);
              alert(err);
            });
          }
        }, err => {
          console.error('*** RequestBusComponent:Error while Registering');
          console.error(err);
          alert(err);
        }
        );

      } else {
        model.journey_type = 'Single';
        this.requestBusService.getRegisterCheckSingle(model.gid, model.journey_type, model.journey_date).subscribe((register) => {
          if (register.status === 'success' && register.data.length > 0) {
            if (window.confirm('You are requesting to update route. Once processed, your data will be permanently updated.')) {
              // put your delete method logic here
              this.requestBusService.updateBusRegistration(model.gid, register.data[0].id, model).subscribe((newrequestbusWithId) => {
                // alert('Route Updated successfully!');
                this.toastr.success('Route Updated successfully!', 'Success!');
                this.router.navigate(['/employee/viewhistory']);
              }, err => {
                console.error('*** RequestBusComponent:Error while Registering');
                console.error(err);
                alert(err);
              });
            }
          } else {
            this.requestBusService.saveBusRegistration(model.gid, model).subscribe((newrequestbusWithId) => {
              // alert('Route Saved successfully!');
              this.toastr.success('Route Saved successfully!', 'Success!');
              this.router.navigate(['/employee/viewhistory']);
            }, err => {
              console.error('*** RequestBusComponent:Error while Registering');
              console.error(err);
              alert(err);
            });
          }
        }, err => {
          console.error('*** RequestBusComponent:Error while Registering', err);
          console.error(err);
          alert(err);
        }
        );
      }
    }
  }
}




