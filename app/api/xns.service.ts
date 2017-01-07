import { Injectable, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IComponent } from '../components/component';
import { IComponentMessage } from '../components/component-message';

@Injectable()
export class XnsService {
    private AUTH_EXPIRES_TIME = 1000 * 60 * 60 * 24;

    private _baseUrl = 'https://xnsensemobile.azurewebsites.net/';
    private _auth: string;
    private _authExpires: Number;
    
    onLogin = new BehaviorSubject<boolean>(false);

    constructor(private _http: Http, 
                private _datePipe: DatePipe) { 
        this._auth = localStorage.getItem('auth');
        this._authExpires = Number(localStorage.getItem('auth_expires') || 0);
    }

    getComponent(id: string): Observable<IComponent> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/component/" + encodeURI(id), options)
            .map((response: Response) => (<IComponent> response.json()))
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveComponent(component: IComponent): Observable<boolean> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth, 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let savable = this.getSaveableComponent(component);
        return this._http.patch(this._baseUrl + "tables/component/" + encodeURI(component.id), JSON.stringify(savable), options)
            .map((response: Response) => {
                return true;
            })
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    echo(component: IComponent, message: string): Observable<boolean> {
        
        let command = { 
            id: component.componentAddress, 
            command: "Echo",
            message: message 
        };
        
        return this.sendCommand(component, command);
    }

    sendCustomCommand(component: IComponent, commandName: string, command: any) : Observable<boolean> {
        let c = command ? command : {};
        c["id"] = component.componentAddress;
        c["command"] = commandName;
        return this.sendCommand(component, c);
    }

    sendCommand(component: IComponent, command: any) : Observable<boolean> {
        var data = {
            action: JSON.stringify(command),
            unitId: component.unitId,
            componentId: component.id
        };
        
        let headers = new Headers({"X-ZUMO-AUTH": this._auth, 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let savable = this.getSaveableComponent(component);
        return this._http.post(this._baseUrl + "api/componentAction", JSON.stringify(data), options)
            .map((response: Response) => {
                return true;
            })
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    getSaveableComponent(component: IComponent): any {
        return {
            name: component.name,
            description: component.description,
            type: component.type
        };
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
        var fromDate = this.getDateParameter(this.getDateOffsetFromNow(-1));
        var address = this._baseUrl + "api/Message?componentAddress=" + encodeURI(component.componentAddress) + "&fromDate=" + fromDate;
        return this._http.get(address , options)
            .map((response: Response) => <IComponentMessage[]> response.json().Data)
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getDateOffsetFromNow(days : number) {
        const secondsPerDay = 1000 * 60 * 60 * 24;
        return new Date(new Date().getTime() + days * secondsPerDay);
    }

    getComponentLatestData(component:IComponent) : Observable<any> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        var address = this._baseUrl + "api/ComponentLatestData?componentAddress=" + encodeURI(component.componentAddress);
        return this._http.get(address , options)
            .map((response: Response) => response.json().Data)
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
        
    }

    otaUpdateComponent(component:IComponent, firmwareUrl: string) :Observable<boolean> {
        let command = { 
            id: component.componentAddress, 
            command: "UpgradeFromHttp",
            url: firmwareUrl
        };
        
        return this.sendCommand(component, command);
    }

    private getDateParameter(date: Date) {
        return this._datePipe.transform(date, 'yyyy-MM-dd');
    }

    public login(user: string, pass: string) : Observable<string> {
        let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
        return this._http.post(this._baseUrl + "api/serviceauth", JSON.stringify({"username":user,"accessToken":`xns:${user}-${pass}`}), options)
            .map((response: Response) => {
                this._auth = response.json().authenticationToken;
                this._authExpires = Date.now() + this.AUTH_EXPIRES_TIME;
                localStorage.setItem('auth', this._auth);
                localStorage.setItem('auth_expires', this._authExpires.toString());

                this.onLogin.next(true);
                return this._auth;
            })
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    public logout()
    {
        this._auth = null;
        localStorage.clear();
        this.onLogin.next(false);
    }

    public isLoggedIn() : boolean {
        return this._auth != null && this._authExpires > Date.now();
    } 

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
