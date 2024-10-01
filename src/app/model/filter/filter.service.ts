import { Injectable, PipeTransform } from '@angular/core';
import { Extension } from '../../pages/extensions/extensions/interfaces/extensions.interface';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { SortColumn, SortDirection } from '../../directives/sortable.directive';

interface SearchResult {
	extensions: Extension[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(extension: Extension[], column: SortColumn, direction: string): Extension[] {
	if (direction === '' || column === '') {
		return extension;
	} else {
		return [...extension].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(extension: Extension, term: string, pipe: PipeTransform) {
	return (
    extension.name.toLowerCase().includes(term) || 
    (extension.contact.organization && extension.contact.organization.toLowerCase().includes(term)) ||
    (extension.contact.location && extension.contact.location.toLowerCase().includes(term)) ||
    (extension.did_number && extension.did_number.toLowerCase().includes(term)) ||
    pipe.transform(extension.extension_id).includes(term) ||
    pipe.transform(extension.extension).includes(term)
	);
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _countries$ = new BehaviorSubject<Extension[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

  constructor(private pipe: DecimalPipe) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._countries$.next(result.extensions);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get countries$() {
		return this._countries$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(extensions?: Extension[]): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let countries = sort(extensions ? extensions : [], sortColumn, sortDirection);

		// 2. filter
		countries = countries.filter((country) => matches(country, searchTerm, this.pipe));
		const total = countries.length;

		// 3. paginate
		countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ countries, total });
	}
}
