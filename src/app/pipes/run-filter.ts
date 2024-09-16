import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RunFilter',
})
export class RunFilter implements PipeTransform {
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
      return item.RunNumber.toLowerCase().includes(searchText);
    });
  }
}