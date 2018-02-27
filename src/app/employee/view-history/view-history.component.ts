import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RequestBusService } from '../services/request-bus.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent implements OnInit {
  public user_empId: number;
  public yearJourneyList: any[];
  public singleJourneyList: any[];
  public showActive: boolean;
  public showCancelled: boolean;

  constructor(private http: Http, private requestBusService: RequestBusService) { }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.user_empId = userData['data'][0]['emp_gid'];
    }

    this.requestBusService.getYearJourneyList(this.user_empId).subscribe(result => {
      this.yearJourneyList = result.data;
    }, err => {
      console.error('***ViewHistoryComponent: error retrieving data from getYearJourneyList', err);
      console.error(err);
      alert(err);
    });

    this.requestBusService.getSingleJourneyList(this.user_empId).subscribe(result => {
      this.singleJourneyList = result.data;
    }, err => {
      console.error('***ViewHistoryComponent: error retrieving data from getSingleJourneyList', err);
      console.error(err);
      alert(err);
    });
  }
}
