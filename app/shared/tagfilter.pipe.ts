import { Pipe, PipeTransform } from '@angular/core';
import { IComponent } from '../components/component';

@Pipe({
    name: "tagfilter",
    pure: false
})
export class TagFilterPipe implements PipeTransform {
    constructor() {}

    transform(value : Array<IComponent>, filterTags: Array<string>) : Array<IComponent> {
        
        let filtered: IComponent[] = [];
        
        if (value != null)
        {
            if (filterTags != null && filterTags.length > 0)
            {
                for (let component of value) {
                    for (let tag of filterTags) {
                        if (component.tag && component.tag.split('|').indexOf(tag) >= 0) {
                            filtered.push(component);
                            break;
                        }
                    }
                }
            }
            else
            {
                return value;
            }
        }
        
        return filtered;
    }
}