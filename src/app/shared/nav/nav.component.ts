import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userName: string;
  userData: any;
  disableEmployeeBus = true;
  disableEmployeeCab = true;
  disableTransport = true;
  disableVendor = true;
  constructor(private router: Router) { }
  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData === undefined) {
      this.router.navigate(['/login']);
    }
    if (userData) {
      this.userName = userData['data'][0]['first_name'] + ' ' + userData['data'][0]['last_name'];
      userData['data'].forEach(element => {
        if (element.role_name === 'Employee') {
          this.disableEmployeeBus = false;
          this.disableEmployeeCab = false;
        } else if (element.role_name === 'Transport Team') {
          this.disableTransport = false;
        } else if (element.role_name === 'Vendor Team') {
          this.disableVendor = false;
        }

      });
    }
  }
  logOut() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
