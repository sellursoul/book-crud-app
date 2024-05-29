import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnChanges,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { IBook } from '../../../../shared/interfaces';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { bookAnimation } from '../../animations';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.scss',
  animations: [bookAnimation],
})
export class BooksTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() openAddModal = new EventEmitter();
  @Output() openEditModal = new EventEmitter();
  @Output() openDeleteModal = new EventEmitter();
  @Output() openInfoModal = new EventEmitter();

  public books = input<IBook[]>([]);

  public dataSource = new MatTableDataSource<IBook>(this.books());
  public columns = ['name', 'author', 'year', 'actions'];
  public columnHeaders: { [key: string]: string } = {
    name: 'Book Name',
    author: 'Author',
    year: 'Year',
    actions: 'Actions',
  };

  ngOnChanges() {
    this.dataSource.data = this.books();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public addBook() {
    this.openAddModal.emit();
  }

  public updateBook(book: IBook) {
    this.openEditModal.emit(book);
  }

  public deleteBook(book: IBook) {
    this.openDeleteModal.emit(book);
  }

  public openBookInfo(book: IBook) {
    this.openInfoModal.emit(book);
  }

  public search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public handleFileInput(event: Event, book: IBook) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const bookIndex = this.books().findIndex((b) => b.id === book.id);
        if (bookIndex !== -1) {
          this.books()[bookIndex].img = reader.result as string;
          this.dataSource.data = [...this.books()];
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }
}
