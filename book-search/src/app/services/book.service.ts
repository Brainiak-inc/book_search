import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Book {
  key: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);

  search(query: string): Observable<Book[]> {
    return this.http
      .get<{ docs: Book[] }>('https://openlibrary.org/search.json', {
        params: { q: query, fields: 'key,title', limit: 20 },
      })
      .pipe(map((res) => res.docs));
  }
}
