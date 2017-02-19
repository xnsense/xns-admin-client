import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'xns-component-tag',
    templateUrl: 'app/components/component-tag.component.html',
    styleUrls: ['app/components/component-tag.component.css']
})
export class ComponentTagComponent {
    @Input() tag: string;
    @Input() on: boolean;
    @Output() toggleTag = new EventEmitter();

    constructor() {
    }

    toggle(): void {
        this.on = !this.on;
        this.toggleTag.emit(this);
    }
}