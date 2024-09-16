import { Component, EventEmitter, input, Input, Output, ViewChild } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableComponent, NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.less'
})
export class TableComponent {

  @ViewChild('virtualTable', { static: false }) nzTableComponent?: NzTableComponent<any>;

  @Input() headers: any [] = [];
  @Input() data: any[] = [];
  @Input() tableDimension = {};
  private destroy$ = new Subject<boolean>();
  public sortName: string | null = null;
  public sortValue: string | null = null;
  public filteredTableData: Array<any> = new Array<any>()

  scrollToIndex(index: number): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrollToIndex(index);
  }

  trackByIndex(_: number, data: any): number {
    return data.index;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        console.log('scroll index to', data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  
  onResize({ width }: NzResizeEvent, key: string): void {
    this.headers = this.headers.map(header => {
      if (header.key === key) {
        return { ...header, columnWidth: width };
      } else {
        return header;
      }
    });
  }

  sortTableData(params: NzTableQueryParams): void {
    const { sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    this.sortName = (currentSort && currentSort.key) || null;
    this.sortValue = (currentSort && currentSort.value) || null;
    this.applyFilters();
  }


  applyFilters(): void {
    this.filteredTableData = [...this.data];  
    if (this.sortName && this.sortName.trim() !== '') {
      this.sortDataList();
    } else {
      this.sortListBasedOnLastEditedTime();
    }
  }

  sortDataList(): void {
    if (typeof this.sortName === 'string' && this.sortName.trim() !== '') {
      this.filteredTableData.sort((a, b) => {
        const valueA = a[this.sortName];
        const valueB = b[this.sortName];
    
        if (valueA === null || valueA === undefined) {
          return this.sortValue === 'ascend' ? -1 : 1;
        }
    
        if (valueB === null || valueB === undefined) {
          return this.sortValue === 'ascend' ? 1 : -1;
        }
    
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return (valueA - valueB) * (this.sortValue === 'ascend' ? 1 : -1);
        } else if (this.isDate(valueA) && this.isDate(valueB)) {
          const dateA = new Date(valueA).getTime();
          const dateB = new Date(valueB).getTime();
          return (dateA - dateB) * (this.sortValue === 'ascend' ? 1 : -1);
        } else {
          const strValueA = String(valueA).toLowerCase();
          const strValueB = String(valueB).toLowerCase();
    
          if (strValueA < strValueB) {
            return this.sortValue === 'ascend' ? -1 : 1;
          } else if (strValueA > strValueB) {
            return this.sortValue === 'ascend' ? 1 : -1;
          } else {
            return 0;
          }
        }
      });
    } else {
      this.sortListBasedOnLastEditedTime();
    }
  }

  sortListBasedOnLastEditedTime(): void {
    this.filteredTableData.sort((a, b) => {
      const timeA = new Date(a.LastEditedTime).getTime();
      const timeB = new Date(b.LastEditedTime).getTime();
      return timeB - timeA;
    });
  }

  isDate(value: any): boolean {
    return value instanceof Date || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value);
  }

}
