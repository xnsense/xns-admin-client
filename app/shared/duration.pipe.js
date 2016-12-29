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
var DurationPipe = (function () {
    function DurationPipe() {
    }
    DurationPipe.prototype.transform = function (value) {
        var output = "";
        var seconds;
        if (typeof value === 'string') {
            try {
                var d = new Date(value);
                seconds = (Date.now() - d.getTime()) / 1000;
            }
            catch (ex) {
                seconds = Number.parseInt(value);
            }
        }
        else if (typeof value === 'number')
            seconds = value;
        else if (value instanceof Date)
            seconds = Date.now() - value.getTime();
        else
            return "Value is not a number or a date (was " + typeof value + ")";
        seconds = Math.floor(seconds);
        // seconds
        output = seconds % 60 + "s";
        // minutes
        seconds = Math.floor(seconds / 60);
        if (seconds > 0)
            output = seconds % 60 + "m " + output;
        // hours
        seconds = Math.floor(seconds / 60);
        if (seconds > 0)
            output = seconds % 24 + "h " + output;
        // days
        seconds = Math.floor(seconds / 24);
        if (seconds > 0)
            output = seconds + " days, " + output;
        return output;
    };
    return DurationPipe;
}());
DurationPipe = __decorate([
    core_1.Pipe({
        name: "duration"
    }),
    __metadata("design:paramtypes", [])
], DurationPipe);
exports.DurationPipe = DurationPipe;
//# sourceMappingURL=duration.pipe.js.map