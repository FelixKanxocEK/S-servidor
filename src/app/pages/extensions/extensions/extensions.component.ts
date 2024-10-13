import { Component, OnInit } from '@angular/core';
import { ExtensionsService } from '../../../model/extensions.service';
import { Extension, Extensions } from './interfaces/extensions.interface';
import { ExcelService } from '../../../utils/excel.service';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrl: './extensions.component.scss'
})
export class ExtensionsComponent implements OnInit {
  extensions!: Extensions;
  // PAGINADOR
  current_page = 1;
  page_size = 20;

  filtered_extensions: Extension[] = [];
  paginated_data: Extension[] = [];
  search_text: string = '';
  
  constructor(
    private readonly ExtensionsService: ExtensionsService, 
    private readonly ExcelService: ExcelService
  ) {}

  async ngOnInit() {
    this.extensions = await this.ExtensionsService.getExtensions();
    this.filterData();
  }

  filterData(): void {
    // Filtrar los datos por el texto de búsqueda
    this.filtered_extensions = this.extensions.extensions.filter((extension_tmp) => {
      const term = this.search_text.toLowerCase();
      return (
        extension_tmp.name.toLowerCase().includes(term) || 
        (extension_tmp.contact.organization && extension_tmp.contact.organization.toLowerCase().includes(term)) ||
        (extension_tmp.contact.location && extension_tmp.contact.location.toLowerCase().includes(term)) ||
        (extension_tmp.did_number && extension_tmp.did_number.toLowerCase().includes(term)) ||
        extension_tmp.extension_id.toString().includes(term) ||
        extension_tmp.extension.toString().includes(term)
      );
    });

    // Paginar los datos filtrados
    this.paginateData();
  }

  paginateData(): void {
    // Calcular el índice de los datos para la página actual
    const startIndex = (this.current_page - 1) * this.page_size;
    const endIndex = startIndex + this.page_size;

    this.paginated_data = this.filtered_extensions.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.current_page = page;
    this.paginateData();
  }

  downloadExcel() {
    this.ExcelService.exportExtensions(this.extensions.extensions);
  }
}
