import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RequestBusService } from '../services/request-bus.service';

@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css']
})
export class CancelRequestComponent implements OnInit {

  constructor(private http: Http, private requestBusService: RequestBusService) { }
  public user_empId: number;
  public journeyActiveList: any;

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.user_empId = userData['data'][0]['emp_gid'];
    }

    this.requestBusService.getActiveList(this.user_empId).subscribe(result => {
      this.journeyActiveList=result;
      console.log(this.journeyActiveList)
    });
  }

}