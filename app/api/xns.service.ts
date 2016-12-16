import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IComponent } from '../components/component';

@Injectable()
export class XnsService {
    private _baseUrl = 'https://xnsensemobile.azurewebsites.net/';
    private _auth: string;

    constructor(private _http: Http) { 

        this.login("", "");
    }

    getComponents(): Observable<IComponent[]> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/component", options)
            .map((response: Response) => <IComponent[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    public login(user: string, pass: string) {
        this._auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2FyZnJlZEBnbWFpbC5jb20iLCJYTlMtQUNDRVNTLVRPS0VOIjoieG5zOnJvYXJmcmVkQGdtYWlsLmNvbS0yMzI5IiwiaWRwIjoieG5zZW5zZSIsImVtYWlsIjoicm9hcmZyZWRAZ21haWwuY29tIiwidmVyIjoiMyIsImlzcyI6Imh0dHBzOi8veG5zZW5zZW1vYmlsZS5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3huc2Vuc2Vtb2JpbGUuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiZXhwIjoxNDgxOTg5NTA5LCJuYmYiOjE0ODE5MDMxMDl9.sYAwSsfSNJsJKvhOEL2gbxpdmVgRCooSkCZBEP8J8YU";
    }
    public isLoggedIn() : boolean {
        return this._auth != null;
    } 
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
