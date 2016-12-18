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
var router_1 = require("@angular/router");
var xns_service_1 = require("../api/xns.service");
var ComponentEditComponent = (function () {
    function ComponentEditComponent(_route, _router, _service) {
        this._route = _route;
        this._router = _router;
        this._service = _service;
    }
    ComponentEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = params['id'];
            _this._service.getComponent(id)
                .subscribe(function (data) {
                _this.component = data;
            }, function (error) { return _this.errorMessage = error; });
        });
    };
    ComponentEditComponent.prototype.save = function () {
        var _this = this;
        this._service
            .saveComponent(this.component)
            .subscribe(function (success) {
            if (success)
                _this._router.navigate(['components']);
        }, function (e) {
        });
    };
    return ComponentEditComponent;
}());
ComponentEditComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/components/component-edit.component.html',
        styleUrls: ['app/components/component-edit.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        xns_service_1.XnsService])
], ComponentEditComponent);
exports.ComponentEditComponent = ComponentEditComponent;
//# sourceMappingURL=component-edit.component.js.map