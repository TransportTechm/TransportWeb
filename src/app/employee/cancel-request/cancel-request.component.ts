import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RequestBusService } from '../services/request-bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css']
})
export class CancelRequestComponent implements OnInit {

  constructor(private requestBusService: RequestBusService, private router: Router) { }
  public user_empId: number;
  public journeyActiveList: any[];
  public selectedId: number;

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.user_empId = userData['data'][0]['emp_gid'];
    }
    this.requestBusService.getActiveList(this.user_empId).subscribe(result => {
      this.journeyActiveList = result.data;
    });
  }
  onSelect(selectedItemId: any) {
    this.selectedId = selectedItemId;
  }
  cancelRequest() {
    this.requestBusService.cancelRegistration(this.user_empId, this.selectedId).subscribe(result => {
      alert('Registration Successfully Cancelled');
      this.router.navigate(['/employee/viewhistory']);
    }, err => {
      console.error('CAncellation failed', err);
      console.error(err);
      alert(err);
    });
  }
}
