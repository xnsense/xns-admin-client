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
var ComponentCustomCommandComponent = (function () {
    function ComponentCustomCommandComponent(_service) {
        this._service = _service;
    }
    ComponentCustomCommandComponent.prototype.ngOnInit = function () {
    };
    ComponentCustomCommandComponent.prototype.sendCommand = function () {
        var command;
        this.errorMessage = null;
        if (this.commandDetails) {
            try {
                command = JSON.parse(this.commandDetails);
            }
            catch (ex) {
                this.errorMessage = ex;
                return;
            }
        }
        this._service.sendCustomCommand(this.component, this.commandName, command).subscribe(function (success) {
        });
    };
    ComponentCustomCommandComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            this.sendCommand();
        }
    };
    return ComponentCustomCommandComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ComponentCustomCommandComponent.prototype, "component", void 0);
ComponentCustomCommandComponent = __decorate([
    core_1.Component({
        selector: 'xns-component-custom-command',
        templateUrl: 'app/components/component-custom-command.component.html',
        styleUrls: ['app/components/component-custom-command.component.css']
    }),
    __metadata("design:paramtypes", [xns_service_1.XnsService])
], ComponentCustomCommandComponent);
exports.ComponentCustomCommandComponent = ComponentCustomCommandComponent;
//# sourceMappingURL=component-custom-command.component.js.map