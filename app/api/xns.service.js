"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var XnsService = (function () {
    function XnsService(_http, _datePipe) {
        this._http = _http;
        this._datePipe = _datePipe;
        this.AUTH_EXPIRES_TIME = 1000 * 60 * 60 * 24;
        this._baseUrl = 'https://xnsensemobile.azurewebsites.net/';
        this.onLogin = new BehaviorSubject_1.BehaviorSubject(false);
        this._auth = localStorage.getItem('auth');
        this._authExpires = Number(localStorage.getItem('auth_expires') || 0);
    }
    XnsService.prototype.getComponent = function (id) {
        var headers = new http_1.Headers({ "X-ZUMO-AUTH": this._auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/component/" + encodeURI(id), options)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    XnsService.prototype.saveComponent = function (component) {
        var headers = new http_1.Headers({ "X-ZUMO-AUTH": this._auth, 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var savable = this.getSaveableComponent(component);
        return this._http.patch(this._baseUrl + "tables/component/" + encodeURI(component.id), JSON.stringify(savable), options)
            .map(function (response) {
            return true;
        })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    XnsService.prototype.echo = function (component, message) {
        var command = {
            id: component.componentAddress,
            command: "Echo",
            message: message
        };
        return this.sendCommand(component, command);
    };
    XnsService.prototype.sendCustomCommand = function (component, commandName, command) {
        var c = command ? command : {};
        c["id"] = component.componentAddress;
        c["command"] = commandName;
        return this.sendCommand(component, c);
    };
    XnsService.prototype.sendCommand = function (component, command) {
        var data = {
            action: JSON.stringify(command),
            unitId: component.unitId,
            componentId: component.id
        };
        var headers = new http_1.Headers({ "X-ZUMO-AUTH": this._auth, 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var savable = this.getSaveableComponent(component);
        return this._http.post(this._baseUrl + "api/componentAction", JSON.stringify(data), options)
            .map(function (response) {
            return true;
        })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    XnsService.prototype.getSaveableComponent = function (component) {
        return {
            name: component.name,
            description: component.description,
            type: component.type
        };
    };
    XnsService.prototype.getComponents = function () {
        var headers = new http_1.Headers({ "X-ZUMO-AUTH": this._auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/component", options)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    XnsService.prototype.getComponentMessages = function (component) {
        var headers = new http_1.Headers({ "X-ZUMO-AUTH": this._auth });
        var options = new http_1.RequestOptions({ headers: headers });
        var fromDate = this.getDateParameter(this.getDateOffsetFromNow(-1));
        var address = this._baseUrl + "api/Message?componentAddress=" + encodeURI(component.componentAddress) + "&fromDate=" + fromDate;
        return this._http.get(address, options)
            .map(function (response) { return response.json().Data; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    XnsService.prototype.getDateOffsetFromNow = function (days) {
        var secondsPerDay = 1000 * 60 * 60 * 24;
        return new Date(new Date().getTime() + days * secondsPerDay);
    };
    XnsService.prototype.getComponentLatestData = function (component) {
        var headers = new http_1.Headers({ "X-ZUMO-AUTH": this._auth });
        var options = new http_1.RequestOptions({ headers: headers });
        var address = this._baseUrl + "api/ComponentDataLatest?componentAddress=" + encodeURI(component.componentAddress);
        return this._http.get(address, options)
            .map(function (response) { return response.json().Data; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    XnsService.prototype.otaUpdateComponent = function (component, firmwareUrl) {
        var command = {
            id: component.componentAddress,
            command: "UpgradeFromHttp",
            url: firmwareUrl
        };
        return this.sendCommand(component, command);
    };
    XnsService.prototype.getDateParameter = function (date) {
        return this._datePipe.transform(date, 'yyyy-MM-dd');
    };
    XnsService.prototype.login = function (user, pass) {
        var _this = this;
        var options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        return this._http.post(this._baseUrl + "api/serviceauth", JSON.stringify({ "username": user, "accessToken": "xns:" + user + "-" + pass }), options)
            .map(function (response) {
            _this._auth = response.json().authenticationToken;
            _this._authExpires = Date.now() + _this.AUTH_EXPIRES_TIME;
            localStorage.setItem('auth', _this._auth);
            localStorage.setItem('auth_expires', _this._authExpires.toString());
            _this.onLogin.next(true);
            return _this._auth;
        })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    XnsService.prototype.logout = function () {
        this._auth = null;
        localStorage.clear();
        this.onLogin.next(false);
    };
    XnsService.prototype.isLoggedIn = function () {
        return this._auth != null && this._authExpires > Date.now();
    };
    XnsService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return XnsService;
}());
XnsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        common_1.DatePipe])
], XnsService);
exports.XnsService = XnsService;
//# sourceMappingURL=xns.service.js.map