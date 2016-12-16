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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var XnsService = (function () {
    function XnsService(_http) {
        this._http = _http;
        this._baseUrl = 'https://xnsensemobile.azurewebsites.net/';
        this.login("", "");
    }
    XnsService.prototype.getComponents = function () {
        var headers = new http_1.Headers({ "X-ZUMO-AUTH": this._auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(this._baseUrl + "tables/component", options)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    XnsService.prototype.login = function (user, pass) {
        this._auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2FyZnJlZEBnbWFpbC5jb20iLCJYTlMtQUNDRVNTLVRPS0VOIjoieG5zOnJvYXJmcmVkQGdtYWlsLmNvbS0yMzI5IiwiaWRwIjoieG5zZW5zZSIsImVtYWlsIjoicm9hcmZyZWRAZ21haWwuY29tIiwidmVyIjoiMyIsImlzcyI6Imh0dHBzOi8veG5zZW5zZW1vYmlsZS5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3huc2Vuc2Vtb2JpbGUuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiZXhwIjoxNDgxOTg5NTA5LCJuYmYiOjE0ODE5MDMxMDl9.sYAwSsfSNJsJKvhOEL2gbxpdmVgRCooSkCZBEP8J8YU";
    };
    XnsService.prototype.isLoggedIn = function () {
        return this._auth != null;
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
    __metadata("design:paramtypes", [http_1.Http])
], XnsService);
exports.XnsService = XnsService;
//# sourceMappingURL=xns.service.js.map