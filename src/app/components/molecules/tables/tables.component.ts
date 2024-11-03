import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface TableColumn {
  header: string;
  field: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];

  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  pageSize: number = 10;
  currentPage: number = 0;
  paginatedData: any[] = [];

  selectedRow: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['pageSize'] || changes['currentPage']) {
      this.paginateData();
    }
  }

  private sortData(): void {
    this.data.sort((a, b) => {
      const valueA = a[this.sortField] ?? '';
      const valueB = b[this.sortField] ?? '';
  
      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.paginateData();
  }
  
  onSortChange(value: string): void {
    const [sortField, sortOrder] = value.split(',');
    this.sortField = sortField;
    this.sortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder as 'asc' | 'desc' : 'asc';
    this.sortData();
  }

  private paginateData(): void {
    if (!this.data) {
      this.paginatedData = [];
      return;
    }
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.data.slice(start, end);
  }

  onFilterChange(filter: string): void {
    if (filter) {
      this.data = this.data.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
    this.currentPage = 0;
    this.paginateData();
  }

  onRowSelect(row: any): void {
    this.selectedRow = row;
  }

  getTotalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.getTotalPages()) {
      this.currentPage = page;
      this.paginateData();
    }
  }
}