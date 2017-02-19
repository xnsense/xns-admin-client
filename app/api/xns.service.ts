import { Injectable, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IComponent } from '../components/component';
import { IHardware } from '../components/hardware';
import { IFirmware } from '../components/firmware';
import { IFirmwareAction } from '../components/firmwareAction';
import { IComponentMessage } from '../components/component-message';
import { IUser } from './user';

@Injectable()
export class XnsService {
    private AUTH_EXPIRES_TIME = 1000 * 60 * 60 * 24;

    private _baseUrl = 'https://xnsensemobile.azurewebsites.net/';
    private _auth: string;
    private _authExpires: Number;
    
    getFirmwareUrl(component: IComponent, sendOTAMessage: boolean):string 
    {
        return this._baseUrl + "api/ComponentFirmwareFile?componentAddress=" + encodeURI(component.componentAddress) + "&sendOTAMessage=" + (sendOTAMessage ? "True" : "False");
    }
    getReleaseFirmwareUrl(component: IComponent,firmware: IFirmware, hardware: IHardware, sendOTAMessage: boolean):string 
    {
        return this._baseUrl + "api/ComponentFirmwareFile?componentAddress=" + encodeURI(component.componentAddress) + "&sendOTAMessage=" + (sendOTAMessage ? "True" : "False") + "&fwRevision=" + encodeURI(firmware.revision) + "&hwName=" + encodeURI(hardware.appname) + "&hwRevision=" + encodeURI(hardware.revision);
    }
    getAuthHeader():string[] {
        return ["X-ZUMO-AUTH", this._auth];
    }
    getUser():IUser 
    {
        return {
            email: localStorage.getItem('email'),
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            currentSolutionId: localStorage.getItem('currentSolutionId')
        };
        //return localStorage.getItem('username');
    }
    onLogin = new BehaviorSubject<boolean>(false);

    constructor(private _http: Http, 
                private _datePipe: DatePipe) { 
        this._auth = localStorage.getItem('auth');
        this._authExpires = Number(localStorage.getItem('auth_expires') || 0);

        if(this.isLoggedIn())
        {
            this.onLogin.next(true);
        }
    }

    getComponent(id: string): Observable<IComponent> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/component/" + encodeURI(id), options)
            .map((response: Response) => (<IComponent> response.json()))
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
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
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
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
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
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
        return this._http.get(this._baseUrl + "api/ComponentDataLatest", options)
            .map((response: Response) => <IComponent[]> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getHardwareList(): Observable<IHardware[]> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/hardware", options)
            .map((response: Response) => <IHardware[]> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    getHardware(id: string): Observable<IHardware> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/hardware/" + encodeURI(id), options)
            .map((response: Response) => <IHardware> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFirmwareList(): Observable<IFirmware[]> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/firmware", options)
            .map((response: Response) => <IFirmware[]> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFirmware(id: string): Observable<IFirmware> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/firmware/" + encodeURI(id), options)
            .map((response: Response) => <IFirmware> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFirmwareActionList(): Observable<IFirmwareAction[]> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/firmwareaction", options)
            .map((response: Response) => <IFirmwareAction[]> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    getFirmwareAction(): Observable<IFirmwareAction> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/firmwareaction", options)
            .map((response: Response) => <IFirmwareAction> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getComponentMessages(component: IComponent, latest: Date) : Observable<IComponentMessage[]> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        
        var address = this._baseUrl + "api/ComponentMessage?componentAddress=" + encodeURI(component.componentAddress) + "&pageSize=100";
        if (latest)
            address += "&fromDate=" + this.getDateParameter(this.addOneMillisencond(latest));

        return this._http.get(address , options)
            .map((response: Response) => <IComponentMessage[]> response.json().results)
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    addOneMillisencond(date: Date) {
        var d = new Date(date);
        d.setMilliseconds(d.getMilliseconds() + 1);
        return d;
    }
    getDateOffsetFromNow(days : number) {
        const secondsPerDay = 1000 * 60 * 60 * 24;
        return new Date(new Date().getTime() + days * secondsPerDay);
    }

    getComponentLatestData(component:IComponent) : Observable<any> {
        let headers = new Headers({"X-ZUMO-AUTH": this._auth});
        let options = new RequestOptions({ headers: headers });
        var address = this._baseUrl + "api/ComponentData?componentAddress=" + encodeURI(component.componentAddress) + "&pageSize=1";
        return this._http.get(address , options)
            .map((response: Response) => response.json().results[0])
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
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
        return new Date(date).toISOString();
        //return this._datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    }

    public login(user: string, pass: string) : Observable<string> {
        let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
        return this._http.post(this._baseUrl + "api/serviceauth", JSON.stringify({"username":user,"accessToken":`xns:${user}-${pass}`}), options)
            .map((response: Response) => {
                this._auth = response.json().authenticationToken;
                var firstName = response.json().user.firstName;
                var lastName = response.json().user.lastName;
                var email = response.json().user.email;
                var currentSolutionId = response.json().user.currentSolutionId;

                this._authExpires = Date.now() + this.AUTH_EXPIRES_TIME;
                localStorage.setItem('auth', this._auth);
                localStorage.setItem('auth_expires', this._authExpires.toString());
                localStorage.setItem('username', user);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                localStorage.setItem('email', email);
                localStorage.setItem('currentSolutionId', currentSolutionId);

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

    public isLoggedIn() : boolean 
    {
        return this._auth != null && this._authExpires > Date.now();
    } 

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
