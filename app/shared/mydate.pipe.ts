import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: "mydate"
})
export class MyDatePipe implements PipeTransform {
    constructor(private _date: DatePipe) {}

    transform(value : any, format: string) : string {
        if (value instanceof Date)
            return this._date.transform(value, format);
        else
        {
            try 
            {
                let d = new Date(value);
                return this._date.transform(d, format);
            }
            catch(ex)
            {
                return ex;
            }
        }
    }
}