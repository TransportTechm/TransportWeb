import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LoginService {
  private requestBusUrl: string;
  constructor(private http: Http) {
    this.requestBusUrl = environment.employeeServiceUrl;
  }
  authenticate(login) {
    return this.http.get(this.requestBusUrl + 'users/login?username=' + login.username + '&password=' + login.password + '')
    .map(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    const errMsg = (error._body) ? error._body :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
}

}
