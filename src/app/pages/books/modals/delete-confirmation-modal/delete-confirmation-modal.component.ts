import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BooksStoreService } from '../../../../shared/services';
import { IBook } from '../../../../shared/interfaces';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.scss',
})
export class DeleteConfirmationModalComponent {
  private _bookStore = inject(BooksStoreService);
  private dialogRef = inject(MatDialogRef<DeleteConfirmationModalComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: IBook) {}

  public delete() {
    this._bookStore.removeBook(this.data.id);
    this.dialogRef.close(true);
  }
}
