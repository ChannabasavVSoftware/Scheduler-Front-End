import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform(value: any[], property: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!value || !Array.isArray(value)) {
      return value;
    }

    const sortedArray = value.sort((a, b) => {
      const compareResult = a[property].localeCompare(b[property]);
      return order === 'asc' ? compareResult : -compareResult;
    });

    return sortedArray;
  }
}

