import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class VendorService {
  private vendorServiceUrl: string;
  public bodyMsg;

  constructor(private http: Http) {
    this.vendorServiceUrl = environment.vendorServiceUrl;
  }

  saveDriverRegistration(resource) {
    // Stringify payload
    const bodyString = JSON.stringify(resource);
    // ... Set content type to JSON
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // Create a request option
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.vendorServiceUrl + 'dri', bodyString, options)
      .map(response => response)
      .catch(this.handleError);
  }

  getDriverList() {
    return this.http.get(this.vendorServiceUrl + 'dris')
      .map(response => response.json())
      .catch(this.handleError);
  }
  getVehicleTypeList() {
    return this.http.get(this.vendorServiceUrl + 'vecTypes')
      .map(response => response.json())
      .catch(this.handleError);
  }

  saveVehicleRegistration(resource) {

        // Stringify payload
        const bodyString = JSON.stringify(resource);
        // console.log('bodystring'+ bodyString)
        // ... Set content type to JSON
        const headers = new Headers({ 'Content-Type': 'application/json' });
        // Create a request option
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.vendorServiceUrl + 'vec' , bodyString, options )
          .map(response => response)
          .catch(this.handleError);
  }

  getVehicleList() {
    return this.http.get(this.vendorServiceUrl + 'vecs')
    .map(response => response.json())
    .catch(this.handleError);
  }

  updateVehicleStatus(regNo, status, resource) {
      const bodyString = JSON.stringify(resource);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });
      return this.http.put(this.vendorServiceUrl + 'vec/' + regNo + '/' + status, bodyString, options)
        .map(response => response)
        .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    this.bodyMsg = JSON.parse(error['_body']).message;
    console.log(this.bodyMsg)
    const errMsg = (this.bodyMsg) ? this.bodyMsg :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
