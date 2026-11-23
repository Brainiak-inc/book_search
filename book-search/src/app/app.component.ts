import { Component } from '@angular/core';
import { BookSearchComponent } from './books.component';

@Component({
  selector: 'app-root',
  imports: [BookSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-search';
}
