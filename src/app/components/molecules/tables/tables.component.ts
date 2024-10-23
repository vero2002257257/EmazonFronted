import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface TablesColumn {
  header: string;
  field: string;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnChanges {
  @Input() columns: TablesColumn[] = [];
  @Input() data: any[] = [];

  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  pageSize: number = 10;
  currentPage: number = 0;
  paginatedData: any[] = [];

  selectedRow: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['pageSize'] || changes['currentPage']) {
      this.paginateData(); // Recalculamos la paginación si hay cambios
    }
  }

  onSortChange(value: string): void {
    const [sortField, sortOrder] = value.split(',');
    this.sortField = sortField;
    this.sortOrder = sortOrder as 'asc' | 'desc';
    this.sortData(); // Llamar a la función de ordenación
  }

  // Método para ordenar los datos
  private sortData(): void {
    this.data.sort((a, b) => {
      const valueA = a[this.sortField];
      const valueB = b[this.sortField];

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.paginateData(); // Recalcular la paginación después de ordenar
  }

  // Método para calcular la paginación
  private paginateData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.data.slice(start, end); // Obtener los datos para la página actual
  }

  // Método para filtrar los datos
  onFilterChange(filter: string): void {
    if (filter) {
      this.data = this.data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
    this.currentPage = 0; // Reiniciar a la primera página
    this.paginateData(); // Recalcular la paginación después de filtrar
  }

  // Método para seleccionar una fila
  onRowSelect(row: any): void {
    this.selectedRow = row;
  }

  // Obtener el total de páginas
  getTotalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  // Cambiar de página
  onPageChange(page: number): void {
    if (page >= 0 && page < this.getTotalPages()) {
      this.currentPage = page; // Cambiar a la página especificada
      this.paginateData(); // Recalcular la paginación
    }
  }

  // Obtener los datos de la página actual
  getDataForCurrentPage() {
    const startIndex = this.currentPage * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  // Método para navegar a la siguiente página
  nextPage() {
    if (this.currentPage < Math.ceil(this.data.length / this.pageSize) - 1) {
      this.currentPage++; // Aumentar el número de la página actual
      this.paginateData(); // Recalcular la paginación
    }
  }

  // Método para navegar a la página anterior
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--; // Disminuir el número de la página actual
      this.paginateData(); // Recalcular la paginación
    }
  }
}
