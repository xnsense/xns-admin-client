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
var xns_service_1 = require("../api/xns.service");
var ComponentDetailsComponent = (function () {
    function ComponentDetailsComponent(_service) {
        this._service = _service;
        this.loading = false;
        this.latest = {};
    }
    ComponentDetailsComponent.prototype.hasTemperature = function () {
        return this.latest && this.latest.data && this.latest.data.Temperatures != null;
        for (var key in this.latest) {
            if (this.latest[key].temperature)
                return true;
        }
        return false;
    };
    ComponentDetailsComponent.prototype.hasPosition = function () {
        return this.latest && this.latest.data && this.latest.data.Positions != null;
        for (var key in this.latest) {
            if (this.latest[key].position)
                return true;
        }
        return false;
    };
    ComponentDetailsComponent.prototype.hasWeigth = function () {
        return this.latest && this.latest.data && this.latest.data.Weights != null;
        for (var key in this.latest) {
            if (this.latest[key].weight)
                return true;
        }
        return false;
    };
    ComponentDetailsComponent.prototype.getJson = function () {
        return JSON.stringify(this.latest, null, 2);
    };
    ComponentDetailsComponent.prototype.ngOnInit = function () {
        this.latest = {};
    };
    ComponentDetailsComponent.prototype.ngOnChanges = function () {
        this.latest = {};
        this.loadLatest();
    };
    ComponentDetailsComponent.prototype.loadLatest = function () {
        var _this = this;
        this.loading = true;
        this._service.getComponentLatestData(this.component).subscribe(function (data) {
            _this.latest = data;
            _this.loading = false;
            setTimeout(function () {
                _this.loadLatest();
            }, 10000);
        });
    };
    return ComponentDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ComponentDetailsComponent.prototype, "component", void 0);
ComponentDetailsComponent = __decorate([
    core_1.Component({
        selector: 'xns-component',
        templateUrl: 'app/components/component-details.component.html',
        styleUrls: ['app/components/component-details.component.css']
    }),
    __metadata("design:paramtypes", [xns_service_1.XnsService])
], ComponentDetailsComponent);
exports.ComponentDetailsComponent = ComponentDetailsComponent;
//# sourceMappingURL=component-details.component.js.map