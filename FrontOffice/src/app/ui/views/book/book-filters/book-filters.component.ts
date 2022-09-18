import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-book-filters',
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.scss'],
})
export class BookFiltersComponent implements OnInit {
  @Output() myEvent = new EventEmitter<string>();
  search!: string;

  searchDebounce = new Subject<string>();

  constructor() {}

  ngOnInit(): void {
    this.searchDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.searchChange();
      });
  }

  ngOnDestroy() {
    this.searchDebounce.unsubscribe();
  }

  searchChange() {
    this.myEvent.emit(this.search);
  }
}
