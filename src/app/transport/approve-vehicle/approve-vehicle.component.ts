import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../../vendor/services/vendor.service';

@Component({
  selector: 'app-approve-vehicle',
  templateUrl: './approve-vehicle.component.html',
  styleUrls: ['./approve-vehicle.component.css']
})
export class ApproveVehicleComponent implements OnInit {
  public vehicleList;
  public viewList;
  public viewModal = false;
  public approveModal = false;
  public cancelModal = false;
  public status;
  public pendingVehicleList;

  constructor(private http: Http, private vendorService: VendorService) { }

  ngOnInit() {
    this.getVehicleList();
  }

  private getVehicleList() {
    this.vendorService.getVehicleList().subscribe(vehicleList => {
      this.pendingVehicleList = vehicleList.filter((element, index, vehicleList) =>
        element.verificationStatus === "Pending");
    },
      err => {
        console.error('*** VehicleComponent: Error while getVehicleList', err);
        console.error(err);
      }
    );
  }

  viewButton(regNo) {
    this.viewModal = true;
    this.vehicleList.forEach(element => {
      if (element.vehicleRegNo == regNo) {
        this.viewList = element;
      }
    });
  }
  approveButton(regNo) {
    this.approveModal = true;
    this.pendingVehicleList.forEach(element => {
      if (element.vehicleRegNo == regNo) {
        this.viewList = element;
      }
    });
  }
  cancelButton(regNo) {
    this.cancelModal = true;
    this.pendingVehicleList.forEach(element => {
      if (element.vehicleRegNo == regNo) {
        this.viewList = element;
      }
    });
  }

  approve(regNo) {
    //console.log(regNo)
    // window.location.reload();
    this.status = 'Approved';
    this.vendorService.updateVehicleStatus(regNo, this.status, this.pendingVehicleList).subscribe((updatedStatus) => {
    alert('vehicle is approved');
    //window.location.reload();
    }, err => {
      console.error('*** VehicleComponent:Error while Approving status');
      console.error(err);
      alert(err);
    });
  }
  cancel(regNo) {
    //console.log(regNo)
    // window.location.reload();
    this.status = 'Cancelled';
    this.vendorService.updateVehicleStatus(regNo, this.status, this.pendingVehicleList).subscribe((updatedStatus) => {
    alert('vehicle is Cancelled');
    //window.location.reload();
    }, err => {
      console.error('*** VehicleComponent:Error while Approving status');
      console.error(err);
      alert(err);
    });
  }
}
