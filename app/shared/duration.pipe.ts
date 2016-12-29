import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "duration"
})
export class DurationPipe implements PipeTransform {
    constructor() {}

    transform(value : number) : string {
        let output = "";
        let seconds = value;
        
        // seconds
        output = `${seconds % 60}s`;
        
        // minutes
        seconds = Math.floor(seconds / 60);
        if (seconds > 0)
            output = `${seconds % 60}m ` + output;

        // hours
        seconds = Math.floor(seconds / 60);
        if (seconds > 0)
            output = `${seconds % 60}h ` + output;

        // days
        seconds = Math.floor(seconds / 24);
        if (seconds > 0)
            output = `${seconds} days, ` + output;
        
        return output;
    }
}