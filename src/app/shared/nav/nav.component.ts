import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userName:string;
  userData:any;
  disableEmployeeBus: boolean = true;
  disableEmployeeCab: boolean = true;
  disableTransport: boolean = true;
  disableVendor: boolean = true;
  constructor(private router: Router) { }
  ngOnInit() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(userData === undefined){
      this.router.navigate(['/login']);
    }
    this.userName=userData[0]['first_name'] + " "+  userData[0]['last_name'];
    userData.forEach(element => {
      if(element.role_name === 'Employee'){
        this.disableEmployeeBus = false;
        this.disableEmployeeCab = false;
      }else if(element.role_name === 'Transport Team'){
        this.disableEmployeeCab = false;
      }else if(element.role_name === 'Transport Team'){
        this.disableVendor = false;
      }
    });
  }
  logOut(){
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
