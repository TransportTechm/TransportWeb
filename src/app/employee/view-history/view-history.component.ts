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
  public yearJourneyList: any;
  public singleJourneyList: any;
  public showActive: boolean;
  public showCancelled: boolean;

  constructor(private http: Http, private requestBusService: RequestBusService) { }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.user_empId = userData['data'][0]['emp_gid'];
    }

    this.requestBusService.getYearJourneyList(this.user_empId).subscribe(result => {
      this.yearJourneyList = result;
      console.log(this.yearJourneyList.data)
    });

    this.requestBusService.getSingleJourneyList(this.user_empId).subscribe(result => {
      this.singleJourneyList = result;
      console.log(this.singleJourneyList.data[0].status)
    });

    if(this.yearJourneyList.data[0].status == 1) {
      this.showActive = true;
    }
      else{
        this.showCancelled = true;
    }
  }
}
