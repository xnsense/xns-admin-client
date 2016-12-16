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
var router_1 = require("@angular/router");
var component_list_component_1 = require("./component-list.component");
var component_details_component_1 = require("./component-details.component");
var xns_service_1 = require("../api/xns-service");
var ComponentModule = (function () {
    function ComponentModule() {
    }
    return ComponentModule;
}());
ComponentModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            router_1.RouterModule.forChild([
                { path: 'components', component: component_list_component_1.ComponentListComponent },
                { path: 'components/:id', component: component_list_component_1.ComponentListComponent }
            ])
        ],
        declarations: [
            component_list_component_1.ComponentListComponent,
            component_details_component_1.ComponentDetailsComponent
        ],
        providers: [
            xns_service_1.XnsService,
        ]
    }),
    __metadata("design:paramtypes", [])
], ComponentModule);
exports.ComponentModule = ComponentModule;
//# sourceMappingURL=component.module.js.map