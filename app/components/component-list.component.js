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
var xns_service_1 = require("../api/xns-service");
var ComponentListComponent = (function () {
    function ComponentListComponent(_route, _router, _service) {
        this._route = _route;
        this._router = _router;
        this._service = _service;
        this.pageTitle = 'Components';
        this.menuToggled = false;
    }
    ComponentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getComponents()
            .subscribe(function (data) {
            _this.components = data;
            _this.sub = _this._route.params.subscribe(function (params) {
                var id = params['id'];
                _this.selectedComponent = _this.components.find(function (c) { return c.componentAddress == id; });
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    ComponentListComponent.prototype.toggleMenu = function () {
        this.menuToggled = !this.menuToggled;
    };
    ;
    return ComponentListComponent;
}());
ComponentListComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/components/component-list.component.html',
        styleUrls: ['app/components/component-list.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        xns_service_1.XnsService])
], ComponentListComponent);
exports.ComponentListComponent = ComponentListComponent;
//# sourceMappingURL=component-list.component.js.map