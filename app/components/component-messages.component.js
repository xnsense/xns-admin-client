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
var ComponentMessagesComponent = (function () {
    function ComponentMessagesComponent(_service) {
        this._service = _service;
    }
    ComponentMessagesComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this._service.getComponentMessages(this.component).subscribe(function (data) {
            _this.messages = data;
        });
    };
    ComponentMessagesComponent.prototype.ngOnInit = function () {
        this.messages = [];
        /*
                this._service.getComponentMessages(this.component).subscribe(data => {
                    this.messages = data;
                });
                */
    };
    return ComponentMessagesComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ComponentMessagesComponent.prototype, "component", void 0);
ComponentMessagesComponent = __decorate([
    core_1.Component({
        selector: 'xns-component-messages',
        templateUrl: 'app/components/component-messages.component.html',
        styleUrls: ['app/components/component-messages.component.css']
    }),
    __metadata("design:paramtypes", [xns_service_1.XnsService])
], ComponentMessagesComponent);
exports.ComponentMessagesComponent = ComponentMessagesComponent;
//# sourceMappingURL=component-messages.component.js.map