import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "duration"
})
export class DurationPipe implements PipeTransform {
    constructor() {}

    transform(value : any) : string {
        let output = "";
        var seconds: number;
        
        if (typeof value === 'string')
        {
            try {
                let d = new Date(value);
                seconds = (Date.now() - d.getTime()) / 1000;
            }
            catch(ex)
            {
             seconds = Number.parseInt(value);
            }
        }
        else if (typeof value === 'number')
            seconds = <number>value;
        else if (value instanceof Date)
            seconds = Date.now() - value.getTime();
        else
            return `Value is not a number or a date (was ${typeof value})`;

        seconds = Math.floor(seconds);

        // seconds
        output = `${seconds % 60}s`;
        
        // minutes
        seconds = Math.floor(seconds / 60);
        if (seconds > 0)
            output = `${seconds % 60}m ` + output;

        // hours
        seconds = Math.floor(seconds / 60);
        if (seconds > 0)
            output = `${seconds % 24}h ` + output;

        // days
        seconds = Math.floor(seconds / 24);
        if (seconds > 0)
            output = `${seconds} days, ` + output;
        
        return output;
    }
}