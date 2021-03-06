import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { RequestBusService } from '../services/request-bus.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css']
})
export class CancelRequestComponent implements OnInit {

  constructor(private requestBusService: RequestBusService, private router: Router,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private confirmationService: ConfirmationService
    ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public user_empId: number;
  public journeyActiveList: any[];
  public selectedId: number;
  public enableCancelButton = true;

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.user_empId = userData['data'][0]['emp_gid'];
    }
    this.requestBusService.getActiveList(this.user_empId).subscribe(result => {
      this.journeyActiveList = result.data;
    }, err => {
      console.error('**CancelRequestComponent: Error with getActiveList', err);
      console.error(err);
      // alert(err);
      this.toastr.error(err, 'Error!');
    }
    );
  }
  onSelect(selectedItemId: any) {
    this.selectedId = selectedItemId;
    this.enableCancelButton = false;
  }
  cancelRequest() {
    this.requestBusService.cancelRegistration(this.user_empId, this.selectedId).subscribe(result => {
      this.router.navigate(['/employee/viewhistory']).then(() => {
        this.toastr.success('Registration Successfully Cancelled', 'Success!');
      });
    }, err => {
      console.error('**CancelRequestComponent: Cancellation failed', err);
      console.error(err);
      // alert(err);
      this.toastr.error(err, 'Error!');
    });

  }
}
