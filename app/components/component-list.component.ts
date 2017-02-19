import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

import { ComponentDetailsComponent } from './component-details.component';

@Component({
    templateUrl: 'app/components/component-list.component.html',
    styleUrls: ['app/components/component-list.component.css']
})
export class ComponentListComponent implements OnInit {
    public pageTitle: string = 'Components';
    public menuToggled: boolean = false;
    public errorMessage: string;
    private sub: Subscription;
    components: IComponent[];
    selectedComponent: IComponent;

   constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _service: XnsService) {

    }

    ngOnInit(): void {
        this._service.getComponents()
            .subscribe(data => {
                this.components = data;
                this.sub = this._route.params.subscribe(
                    params => {
                        let id = params['id'];
                        this.selectedComponent = this.components.find(c => c.componentAddress == id);
                    });
                },
                error => this.errorMessage = <any>error);
    }
    toggleMenu() : void {
        this.menuToggled = !this.menuToggled;
    };


    getTags(): string[] {
        return [];
        //return ["Fagerland", "temperatur", "display", "garasje"];
    }
}
