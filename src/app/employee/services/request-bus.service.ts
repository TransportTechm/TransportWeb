import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class RequestBusService {
  private employeeServiceUrl: string;
  private transportServiceUrl: string;

  constructor(private http: Http) {
    this.employeeServiceUrl = environment.employeeServiceUrl;
    this.transportServiceUrl = environment.transportServiceUrl;
  }
  getBusRegistrationDetails(id) {
    return this.http.get(this.employeeServiceUrl + 'users/' + id + '/register/bus')
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

    return this.http.post(this.employeeServiceUrl + 'users/' + id + '/register/bus/', bodyString, options)
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
    return this.http.put(this.employeeServiceUrl + 'users/' + gid + '/register/bus/' + id, bodyString, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  deleteBusRegistration(id) {
    return this.http.delete(this.employeeServiceUrl + 'users/' + id + '/register/bus')
      .map(response => response.json())
      .toPromise()
      .catch(this.handleError);
  }

  getRegisterCheckYear(id, jID) {
    return this.http.get(this.employeeServiceUrl + 'users/' + id + '/registercheckyear/' + jID)
      .map(response => response.json())
      .catch(this.handleError);
  }
  getRegisterCheckSingle(id, jID, JDATE) {
    return this.http.get(this.employeeServiceUrl + 'users/' + id + '/registerchecksingle/' + jID + '/' + JDATE)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getYearJourneyList(id) {
    return this.http.get(this.employeeServiceUrl + 'users/' + id + '/journeys/year')
      .map(response => response.json())
      .catch(this.handleError);
  }

  getSingleJourneyList(id) {
    return this.http.get(this.employeeServiceUrl + 'users/' + id + '/journeys/single')
      .map(response => response.json())
      .catch(this.handleError);
  }

  getActiveList(id) {
    return this.http.get(this.employeeServiceUrl + 'users/' + id + '/journeys/active')
      .map(response => response.json())
      .catch(this.handleError);
  }

  cancelRegistration(gid, id) {
    const bodyString = '';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // Create a request option
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.employeeServiceUrl + 'users/' + gid + '/journeys/cancel/' + id, bodyString, options)
    .map(response => response.json())
    .catch(this.handleError);
  }
  getJourneyCity(id) {
    return this.http.get(this.transportServiceUrl + 'orgs/' + id + '/cities')
      .map(response => response.json())
      .catch(this.handleError);
  }
  getJourneyLocation(id) {
    return this.http.get(this.transportServiceUrl + 'users/' + id + '/journeys/active')
      .map(response => response.json())
      .catch(this.handleError);
  }
  getJourneyType(id) {
    return this.http.get(this.transportServiceUrl + 'users/' + id + '/journeys/active')
      .map(response => response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
