import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IComponent } from '../components/component';
import { IComponentMessage } from '../components/component-message';

@Injectable()
export class XnsService {
    private _baseUrl = 'https://xnsensemobile.azurewebsites.net/';
    private _auth: string;

    constructor(
        private _http: Http,
        private datePipe: DatePipe
    ) { 

        this._auth = localStorage.getItem('auth');
    }

    getComponents(): Observable<IComponent[]> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/component", options)
            .map((response: Response) => <IComponent[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getComponentMessages(component: IComponent) : Observable<IComponentMessage[]> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        
        let options = new RequestOptions({ headers: headers });
        var fromDate = this.getDateParameter(new Date(new Date().getTime() - 7 * 1000 * 60 * 60 * 24));
        var address = this._baseUrl + "api/Message?componentAddress=" + encodeURI(component.componentAddress) + "&fromDate=" + fromDate;
        return this._http.get(address , options)
            .map((response: Response) => <IComponentMessage[]> response.json().Data)
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private getDateParameter(date: Date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    public login(user: string, pass: string) : Observable<string> {
        let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
        return this._http.post(this._baseUrl + "api/serviceauth", JSON.stringify({"username":user,"accessToken":pass}), options)
            .map((response: Response) => {
                this._auth = response.json().authenticationToken;
                localStorage.setItem('auth', this._auth);
                return this._auth;
            })
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    public logout()
    {
        this._auth = null;
        localStorage.clear();
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
