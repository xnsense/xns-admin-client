import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'xns-component-tag',
    templateUrl: 'app/components/component-tag.component.html',
    styleUrls: ['app/components/component-tag.component.css']
})
export class ComponentTagComponent {
    @Input() tag: string;
    on: boolean;

    constructor() {
    }
}