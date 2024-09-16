import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    if (searchText == 'All') {
        return items;
      }
    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return item.Values[0].Value.toLowerCase().includes(searchText);
    });
  }
}