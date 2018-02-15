import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { RequestBusService } from '../services/request-bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.css']
})
export class ViewAvailabilityComponent implements OnInit {

  public availabilityForm: FormGroup;
  public cities_list;
  public locations_list;
  public journeyType;
  public showdatepicker = false;
  public routes_list;
  public routes_list2;
  public selectedRouteNum;
  public availabilty: any;
  public showgrid = false;
  public showgrid2 = false;
  public showPlaces = false;

  constructor(private http: Http, private _formBuilder: FormBuilder, private requestBusService: RequestBusService) { }

  ngOnInit() {
    this.buildForm();
    this.getJourneyCity();
    this.getJourneyType();
  }

  private buildForm(): void {
    this.availabilityForm = this._formBuilder.group({
      'journeycity': ['', [Validators.required]],
      'journeylocation': ['', [Validators.required]],
      'journey_type': ['', [Validators.required]],
      'route_no': ['']
    });
  }

  private getJourneyCity() {
    this.http.get('assets/apis/cities.json').subscribe(res => this.cities_list = res.json());
  }
  onSelectCity(value) {
    this.getJourneyLocation();
  }
  private getJourneyLocation() {
    this.http.get('assets/apis/locations.json').subscribe(res => this.locations_list = res.json());
  }
  onSelectLocation(value) {
  }
  private getJourneyType() {
    this.http.get('assets/apis/JourneyType.json').subscribe(res => this.journeyType = res.json());
  }
  onSelectJourneyType(selectedItem: any) {
    if (selectedItem.id === 2) {
      this.showdatepicker = true;
      this.getRouteList();
    } else {
      this.showdatepicker = false;
      this.getRouteList();
    }
  }
  private getRouteList() {
    this.http.get('assets/apis/routes_list.json').subscribe(res =>
      this.routes_list = res.json()
    );
  }
  onSelectRouteNum(routeNum) {
    this.showPlaces = true;
    this.http.get('assets/apis/seatCapacity.json').subscribe(res =>
      this.routes_list2 = res.json()
    );
  }
  proceed() {
    this.requestBusService.getSeatAvailabilty(this.routes_list2[0].RouteNo).subscribe(result => {
      this.availabilty = (this.routes_list2[0].SeatCapacity) - (result.data[0].occupiedSeats);
      console.log(this.availabilty);
      if (this.availabilty > 0) {
        this.showgrid = true;
      } else {
        this.showgrid2 = true;
      }
    }, err => {
      console.error('error retrieving data', err);
      console.error(err);
      alert(err);
    });
  }
  cancel() {
    this.showgrid = false;
  }
}
