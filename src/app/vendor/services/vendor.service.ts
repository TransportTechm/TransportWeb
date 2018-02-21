import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class VendorService {
  private vendorServiceUrl: string;

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

    return this.http.post(this.vendorServiceUrl + '/dri', bodyString, options)
      .map(response => response)
      .catch(this.handleError);
  }

  getDriverList() {
    return this.http.get(this.vendorServiceUrl + '/dris')
      .map(response => response.json())
      .catch(this.handleError);
  }
  getVehicleTypeList() {
    return this.http.get(this.vendorServiceUrl + '/vecTypes')
      .map(response => response.json())
      .catch(this.handleError);
  }

  saveVehicleRegistration(resource, regNo, DId, VId){
        // Stringify payload
        const bodyString = JSON.stringify(resource);
        // ... Set content type to JSON
        const headers = new Headers({ 'Content-Type': 'application/json' });
        // Create a request option
        const options = new RequestOptions({ headers: headers });
    
        return this.http.post(this.vendorServiceUrl + 'vec/' + regNo + '/' + DId + '/'+ VId, bodyString, options )
          .map(response => response)
          .catch(this.handleError);
  }
 
  getVehicleList(){
    return this.http.get(this.vendorServiceUrl + '/vecs')
    .map(response => response.json())
    .catch(this.handleError);
  }

  updateVehicleStatus(regNo, resource){
      const bodyString = JSON.stringify(resource);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });
      return this.http.put(this.vendorServiceUrl + '/vecs/' + regNo, bodyString, options)
        .map(response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
