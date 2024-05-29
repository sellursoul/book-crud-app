import { Component, OnInit, inject, signal } from '@angular/core';
import { BooksHeaderComponent, BooksTableComponent } from './components';
import { BooksStoreService } from '../../shared/services';
import { IBook } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HandleBookModalComponent, DeleteConfirmationModalComponent, BookInformationModalComponent } from './modals';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    BooksHeaderComponent,
    BooksTableComponent,
    MatDialogModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
@UntilDestroy()
export class BooksComponent implements OnInit {
  private _booksStore = inject(BooksStoreService);
  private _dialog = inject(MatDialog);
  public booksList: IBook[] = [];

  ngOnInit(): void {
    this._booksStore.books$.pipe(untilDestroyed(this)).subscribe({
      next: (response) => {
        this.booksList = response;
      },
    });
  }

  public openAddBookModal() {
    const dialogRef = this._dialog.open(HandleBookModalComponent, {
      width: '500px',
    });
  }

  public openEditBookModal(book: IBook) {
    const dialogRef = this._dialog.open(HandleBookModalComponent, {
      width: '500px',
      data: book,
    });
  }

  public openDeleteBookModal(book: IBook) {
    const dialogRef = this._dialog.open(DeleteConfirmationModalComponent, {
      width: '500px',
      data: book,
    });
  }

  public openInfoBookModal(book: IBook) {
    const dialogRef = this._dialog.open(BookInformationModalComponent, {
      width: '500px',
      data: book,
    });
  }
}
