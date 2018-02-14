import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class RequestBusService {
  private requestBusUrl: string;

  constructor(private http: Http) {
    this.requestBusUrl = environment.employeeServiceUrl;
   }
  getBusRegistrationDetails(id) {
    return this.http.get(this.requestBusUrl + 'users/' + id + '/register/bus')
      .map(response => response.json())
      .catch(this.handleError);
  }

  saveBusRegistration(id, resource) {
    // Stringify payload
    const bodyString = JSON.stringify(resource);
    // ... Set content type to JSON
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // Create a request option
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.requestBusUrl + 'users/' + id + '/register/bus/', bodyString, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  updateBusRegistration(gid, id, resource) {
    // Stringify payload
    const bodyString = JSON.stringify(resource);
    // ... Set content type to JSON
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // Create a request option
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.requestBusUrl + 'users/' + gid + '/register/bus/' + id, bodyString, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  deleteBusRegistration(id) {
    return this.http.delete(this.requestBusUrl + 'users/' + id + '/register/bus')
      .map(response => response.json())
      .toPromise()
      .catch(this.handleError);
  }

  getRegisterCheckYear(id, jID) {
    return this.http.get(this.requestBusUrl + 'users/' + id + '/registercheckyear/' + jID )
      .map(response => response.json())
      .catch(this.handleError);
  }
  getRegisterCheckSingle(id, jID, JDATE) {
    return this.http.get(this.requestBusUrl + 'users/' + id + '/registerchecksingle/' + jID + '/' + JDATE)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getYearJourneyList(id){
    return this.http.get(this.requestBusUrl + 'users/' + id + '/journeys/year')
    .map(response => response.json())
    .catch(this.handleError);
  }

  getSingleJourneyList(id){
    return this.http.get(this.requestBusUrl + 'users/' + id + '/journeys/single')
    .map(response => response.json())
    .catch(this.handleError);
  }
  
  getActiveList(id) {
    return this.http.get(this.requestBusUrl + 'users/' + id + '/journeys/active')
    .map(response => response.json())
    .catch(this.handleError);
   }

  private handleError(error: Response | any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
