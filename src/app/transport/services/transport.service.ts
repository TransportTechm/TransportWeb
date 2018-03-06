import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class TransportService {
  
  private employeeServiceUrl: string;
  private transportServiceUrl: string;
  public bodyMsg;

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
    // console.log(error)
    this.bodyMsg = JSON.parse(error['_body']).message;
    // console.log(this.bodyMsg)
    const errMsg = (this.bodyMsg) ? this.bodyMsg :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
