import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';
import { ComponentTagComponent } from './component-tag.component'
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
    selectedTags: string[];

   constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _service: XnsService) {

    }

    ngOnInit(): void {
        this._service.getComponents()
            .subscribe(data => {
                this.components = data;
                
                var selected = window.localStorage.getItem("selectedTags");
                if (selected != null)
                    this.selectedTags = selected.split('|').filter(v => v);
                else
                    this.selectedTags = [];
                
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
        let tags: string[] = [];

        if (this.components)
        {
            for (let component of this.components)
            {
                if (component.tag) {
                    var localTags = component.tag.split('|');
                    for (let localTag of localTags)
                        if (localTag && tags.indexOf(localTag) < 0)
                            tags.push(localTag);
                }
            }
        }

        return tags;
        //return ["Fagerland", "temperatur", "display", "garasje"];
    }
    
    isSelected(tag: string): boolean {
        if (this.selectedTags == null)
            return true;
        else
            return this.selectedTags.indexOf(tag) >= 0;
    }

    updateTags(tag: ComponentTagComponent): void {
        
        var i = this.selectedTags.indexOf(tag.tag);
        if (i >= 0)
            this.selectedTags.splice(i, 1);
        else if (tag.tag)
            this.selectedTags.push(tag.tag);

        window.localStorage.setItem("selectedTags", this.selectedTags.filter(v => v).join('|'));
    }
}
