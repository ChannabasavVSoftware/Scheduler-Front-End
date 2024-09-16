import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keyValueUnsorted'})
export class KeyValueUnsortedPipe implements PipeTransform {
  transform(value: any): any {
    debugger;
    return Object.keys(value).map(key => ({key: key, value: value[key]}));
  }
}
