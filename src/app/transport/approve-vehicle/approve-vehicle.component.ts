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

  constructor(private http: Http, private vendorService: VendorService) { }

  ngOnInit() {
    this.getVehicleList();
  }

  private getVehicleList(){
    this.vendorService.getVehicleList().subscribe(vehicleList => {
      vehicleList.forEach(element => {
        element.verificationStatus="pending";
      });
      this.vehicleList = vehicleList;
      console.log(this.vehicleList);
    },
      err => {
        console.error('*** VehicleComponent: Error while getVehicleList', err);
        console.error(err);
      }
    );
  }

  viewButton(regNo){
    this.viewModal = true;
    this.vehicleList.forEach(element => {
      if(element.vehicleRegNo == regNo){
        this.viewList = element;
      }
    });
  }
  approveButton(regNo){
    this.approveModal = true;
    this.vehicleList.forEach(element => {
      if(element.vehicleRegNo == regNo){
        this.viewList = element;
      }
    });
  }
  cancelButton(regNo){
    this.cancelModal = true;
    this.vehicleList.forEach(element => {
      if(element.vehicleRegNo == regNo){
        this.viewList = element;
      }
    });
  }

  approve(regNo){
    console.log(regNo)
    this.vehicleList.forEach(element => {
      if(element.vehicleRegNo == regNo){
        element.verificationStatus="Approved"
      }
    });
    // window.location.reload();
    /* this.vendorService.updateVehicleStatus(regNo, model).subscribe((updatedStatus) => {
    alert("vehicle is approved")
    }, err => {
      console.error('*** VehicleComponent:Error while Approving status');
      console.error(err);
      alert(err);
    }); */
  }

}
