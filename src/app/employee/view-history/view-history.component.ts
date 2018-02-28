import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { RequestBusService } from '../services/request-bus.service';
import { ToastsManager } from 'ng2-toastr';

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

  constructor(private http: Http, private requestBusService: RequestBusService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

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
      // alert(err);
      this.toastr.error(err, 'Error!')
    });

    this.requestBusService.getSingleJourneyList(this.user_empId).subscribe(result => {
      this.singleJourneyList = result.data;
    }, err => {
      console.error('***ViewHistoryComponent: error retrieving data from getSingleJourneyList', err);
      console.error(err);
      // alert(err);
      this.toastr.error(err, 'Error!')
    });
  }
}
