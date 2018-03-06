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
  public data;

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
        // console.log(this.departures);
      }
    });
  }

  ConvertToCSV(routes_list) {
    var array = typeof this.routes_list != 'object' ? JSON.parse(this.routes_list) : this.routes_list;
    var str = '';
    var row = "";

    for (var index in this.routes_list[0]) {
      // Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      for(var j = 0; j < array[i][index].length; j++){
      var line = '';
      for (var index in array[i]) {
        // if (line != '') line += ','
        if(index === 'bpoints'){
          // for(var j = 0; j < array[i][index].length; j++){
            if (line != '') line += ','
          line += array[i][index][j].name;
          // }
        }
        else{
          if (line != '') line += ','
          line += array[i][index];
      }
      }
      str += line + '\r\n';
    }
  }
    return str;
  }

  download() {
    var csvData = this.ConvertToCSV(this.data);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Route List.csv';
    a.click();
  }
  
}
