import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "keys"
})
export class KeysPipe implements PipeTransform {
    transform(value : Array<any>, prop: string) : Array<any> {
        let keys = [];
        for (let key in value) {
            if (prop == null || value[key][prop])
                keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}