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
      .map(response => response.json())
      .catch(this.handleError);
  }

  getDriverList() {
    return this.http.get(this.vendorServiceUrl + '/dris')
      .map(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
