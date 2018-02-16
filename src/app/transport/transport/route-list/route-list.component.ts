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
  constructor(private http: Http) { }

  ngOnInit() {
    this.getRouteList();
    this.getdepartureTimeList();
  }
  private getRouteList() {
    this.http.get('assets/apis/routes_list.json').subscribe(res => this.routes_list = res.json());
  }
  private getdepartureTimeList() {
    this.http.get('assets/apis/departureTime.json').subscribe(res => this.departureTime_list = res.json());
  }

}
