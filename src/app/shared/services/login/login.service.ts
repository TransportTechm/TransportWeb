import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  url: any;
  constructor(private http: Http) {
  }
  authenticate(login) {
    this.url = 'http://localhost:3000/transportationapi/employee/1.0/users/login?username=' + login.username + '&password=' + login.password + '';
    return this.http.get(this.url)
    .map(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    const errMsg = (error._body) ? error._body :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
}

}
