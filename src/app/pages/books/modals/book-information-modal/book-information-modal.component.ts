import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { IBook } from '../../../../shared/interfaces';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal';
import { HandleBookModalComponent } from '../handle-book-modal';


@Component({
  selector: 'app-book-information-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './book-information-modal.component.html',
  styleUrl: './book-information-modal.component.scss',
})
export class BookInformationModalComponent {
  private dialogRef = inject(MatDialogRef<BookInformationModalComponent>);
  private _dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: IBook) {}

  public openEditBookModal(book: IBook) {
    this.dialogRef.close(true);
    const dialogRef = this._dialog.open(HandleBookModalComponent, {
      width: '500px',
      data: book,
    });
  }

  public openDeleteBookModal(book: IBook) {
    this.dialogRef.close(true);
    const dialogRef = this._dialog.open(DeleteConfirmationModalComponent, {
      width: '500px',
      data: book,
    });
  }
}
