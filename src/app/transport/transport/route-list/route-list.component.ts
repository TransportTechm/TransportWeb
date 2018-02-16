import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  public routes_list;
  public departureTime_list;
  public departures;
  public destination;
  constructor(private http: Http) { }

  ngOnInit() {
    this.getRouteList();
  }
  private getRouteList() {
    this.http.get('assets/apis/routes_list.json').subscribe(res => this.routes_list = res.json());
  }
  showTimings(routeNo, destination) {
    console.log(routeNo)
    this.destination = destination;
    this.routes_list.forEach(element => {
      if (element.RouteNo === routeNo) {
        this.departures = element.PickupPoint;
        console.log(this.departures)
      }
    });
    this.getdepartureTimeList();
  }
  private getdepartureTimeList() {
    this.http.get('assets/apis/departureTime.json').subscribe(res => this.departureTime_list = res.json());
  }

}
