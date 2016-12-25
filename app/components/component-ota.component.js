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
var ComponentOtaComponent = (function () {
    function ComponentOtaComponent(_route, _router, _service) {
        this._route = _route;
        this._router = _router;
        this._service = _service;
    }
    ComponentOtaComponent.prototype.ngOnInit = function () {
    };
    ComponentOtaComponent.prototype.update = function () {
        var _this = this;
        this._service
            .otaUpdateComponent(this.component, this.firmwareUrl)
            .subscribe(function (success) {
            _this.message = "Successfully sent upgrade command. Monitor messages for status";
        }, function (e) {
        });
    };
    return ComponentOtaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ComponentOtaComponent.prototype, "component", void 0);
ComponentOtaComponent = __decorate([
    core_1.Component({
        selector: 'xns-component-ota',
        templateUrl: 'app/components/component-ota.component.html',
        styleUrls: ['app/components/component-ota.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        xns_service_1.XnsService])
], ComponentOtaComponent);
exports.ComponentOtaComponent = ComponentOtaComponent;
//# sourceMappingURL=component-ota.component.js.map