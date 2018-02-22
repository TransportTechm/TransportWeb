import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class TransportService {
  private employeeServiceUrl: string;
  private transportServiceUrl: string;

  constructor(private http: Http) {
    this.employeeServiceUrl = environment.employeeServiceUrl;
    this.transportServiceUrl = environment.transportServiceUrl;
  }

  getAllRoutesList() {
    return this.http.get(this.transportServiceUrl + 'routes' )
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
