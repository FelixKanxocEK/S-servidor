import { Component, OnInit, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { ExtensionsService } from '../../../model/extensions.service';
import { map, Observable, pipe, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Extension, Extensions } from './interfaces/extensions.interface';
import { DecimalPipe } from '@angular/common';
// import { NgbdSortableHeader, SortEvent } from './sortable.directive';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrl: './extensions.component.scss'
})
export class ExtensionsComponent implements OnInit {
  extensions$!: Observable<Extension[]>;
	filter = new FormControl('', { nonNullable: true });  
  extensions!: Extensions;

  // @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  // PAGINADOR
  page = 1;
	pageSize = 4;
  // collectionSize = this.extensions.extensions.length;
  
  constructor(private readonly ExtensionsService: ExtensionsService, private readonly DecimalPipe: DecimalPipe) {
  }

  async ngOnInit() {
    this.extensions = await this.ExtensionsService.getExtensions();
    this.extensions$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => this.search(text, this.DecimalPipe)),
		);

    // this.refreshExtensions();
  }

  search(text: string, pipe: PipeTransform): Extension[] {
    return this.extensions.extensions.filter((extension_tmp) => {
      const term = text.toLowerCase();
      return (
        extension_tmp.name.toLowerCase().includes(term) || 
        (extension_tmp.contact.organization && extension_tmp.contact.organization.toLowerCase().includes(term)) ||
        (extension_tmp.contact.location && extension_tmp.contact.location.toLowerCase().includes(term)) ||
        (extension_tmp.did_number && extension_tmp.did_number.toLowerCase().includes(term)) ||
        pipe.transform(extension_tmp.extension_id).includes(term) ||
        pipe.transform(extension_tmp.extension).includes(term)
      );
    });
  }
}
