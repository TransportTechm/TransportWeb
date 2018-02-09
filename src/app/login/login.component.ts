import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  userResult: any = [];
  url: any;
  constructor(
    private router: Router,
    private loginService: LoginService) { }
  ngOnInit() {
    localStorage.removeItem('userData');
  }
  login() {
    this.loading = true;
    this.loginService.authenticate(this.model).subscribe(user => {
      let userJson = user;
      console.log(user);
      localStorage.setItem('userData', JSON.stringify(user))
      this.loading = false;
      this.router.navigate(['/']);
    }, err => {
      var errJson = JSON.parse(err);
      this.error = errJson.message;
      this.loading = false;
    })
  }
}
