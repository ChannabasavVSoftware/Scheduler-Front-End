import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion'
})
export class ConversionPipe implements PipeTransform {
  transform(value: number, conversionType: number): string {
    let result: number;
    if (conversionType === 1) {
      result = value / 3.28084;
      return result.toFixed(3);
    } else {
        result = value
        return result.toFixed(2);
    }
    
  }
}