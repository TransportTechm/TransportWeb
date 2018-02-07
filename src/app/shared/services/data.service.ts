import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
    constructor(public url: string, public http: Http) { }

    get() {
        return this.http.get(this.url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getByID(id) {
        return this.http.get(this.url + '/' + id)
            .map(response => response.json())
            .catch(this.handleError);
    }

    post(resource) {
        // Stringify payload
        const bodyString = JSON.stringify(resource);
        // ... Set content type to JSON
        const headers = new Headers({ 'Content-Type': 'application/json' });
        // Create a request option
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, bodyString, options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    put(resource) {
        return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
            .map(response => response.json())
            .catch(this.handleError);
    }

    delete(id) {
        return this.http.delete(this.url + '/' + id)
            .map(response => response.json())
            .toPromise()
            .catch(this.handleError);
    }


    private handleError(error: Response | any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

}
