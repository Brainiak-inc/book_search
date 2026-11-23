import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { BookService } from './services/book.service';


@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <input [formControl]="query" placeholder="Поиск книг" />

    <ul>
      @for (book of books$ | async; track book.key) {
        <li>{{ book.title }}</li>
      }
    </ul>
  `,
})
export class BookSearchComponent {
  private readonly bookService = inject(BookService);

  readonly query = new FormControl('', { nonNullable: true });

  readonly books$ = this.query.valueChanges.pipe(
    map((q) => q.trim()),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((q) =>
      q ? this.bookService.search(q).pipe(catchError(() => of([]))) : of([]),
    ),
  );
}
