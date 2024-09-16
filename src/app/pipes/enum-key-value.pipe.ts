import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'enumKeyValueList'
})

export class EnumKeyValueListPipe implements PipeTransform {
    transform(value): any {
        if(value != undefined)
        return Object.keys(value).filter(e => !isNaN(+e)).map(o => { return { index: +o, name: value[o] } });
    }
}