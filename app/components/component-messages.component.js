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
        this.messages = [];
        this.loading = false;
        this.latestMessage = null;
    }
    ComponentMessagesComponent.prototype.ngOnChanges = function () {
        this.loading = true;
        this.messages = [];
        this.latestMessage = null;
        this.loadNewMessages();
    };
    ComponentMessagesComponent.prototype.loadNewMessages = function () {
        var _this = this;
        try {
            this.loading = true;
            this._service.getComponentMessages(this.component, this.latestMessage).subscribe(function (data) {
                if (data.length > 0)
                    _this.latestMessage = data[0].processed;
                if (_this.messages)
                    _this.messages = data.concat(_this.messages);
                else
                    _this.messages = data;
                _this.loading = false;
                setTimeout(function () {
                    _this.loadNewMessages();
                }, 5000);
            });
        }
        catch (ex) {
            this.errorMessage = ex;
            this.loading = false;
        }
    };
    ComponentMessagesComponent.prototype.ngOnInit = function () {
    };
    ComponentMessagesComponent.prototype.echo = function () {
        var _this = this;
        this._service.echo(this.component, this.echoMessage).subscribe(function (success) {
            setTimeout(function () {
                _this.loadNewMessages();
            }, 3000);
        });
    };
    ComponentMessagesComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            this.echo();
        }
    };
    ComponentMessagesComponent.prototype.refresh = function () {
        this.loadNewMessages();
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