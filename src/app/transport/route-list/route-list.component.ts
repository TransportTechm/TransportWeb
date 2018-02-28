import { Component, OnInit, ViewChild, NgModule, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { TransportService } from '../services/transport.service';
import { ToastsManager } from 'ng2-toastr';

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
  constructor(private http: Http, private transportService: TransportService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getRouteList();
  }

  private getRouteList() {
    // this.http.get('assets/apis/routes_list.json').subscribe(res => this.routes_list = res.json());
    this.transportService.getAllRoutesList().subscribe(routes_list => {
      // console.log(routes_list);
      this.routes_list = routes_list;
    },
      err => {
        console.error('*** RouteListComponent: Error while getRouteList', err);
        console.error(err);
        this.toastr.error(err, 'Error!');
      }
    );
  }

  showTimings(routeNo) {
    // console.log(routeNo);
    this.routes_list.forEach(element => {
      if (element.routeNo === routeNo) {
        this.departures = element.bpoints;
        console.log(this.departures);
      }
    });
  }

}
