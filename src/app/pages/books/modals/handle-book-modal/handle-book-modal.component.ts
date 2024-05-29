import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MyErrorStateMatcher } from '../../../../shared/classes';
import { validateAllFormFields } from '../../../../shared/helpers';
import { IBook } from '../../../../shared/interfaces';
import { BooksStoreService } from '../../../../shared/services';
import { HandleBook } from './handle-book-form.interface';

@Component({
  selector: 'app-handle-book-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './handle-book-modal.component.html',
  styleUrl: './handle-book-modal.component.scss',
})
export class HandleBookModalComponent implements OnInit {
  private _fb = inject(NonNullableFormBuilder);
  private _bookStore = inject(BooksStoreService);
  private dialogRef = inject(MatDialogRef<HandleBookModalComponent>);
  protected form!: FormGroup<HandleBook>;
  public matcher = new MyErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IBook) {}

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm() {
    this.form = this._fb.group({
      name: this._fb.control(this.data?.name ?? '', [Validators.required]),
      author: this._fb.control(this.data?.author ?? '', [Validators.required]),
      year: this._fb.control(this.data?.year ?? '', [Validators.required]),
      description: this._fb.control(this.data?.description ?? '', [Validators.required]),
    });
  }

  public handle() {
    if (!this.form.valid) {
      validateAllFormFields(this.form);
      return;
    }
    const book: IBook = {
      id: this.data?.id || (this._bookStore.allBooks.length + 1).toString(),
      name: this.form.get('name')?.value as string,
      author: this.form.get('author')?.value as string,
      year: this.form.get('year')?.value as string,
      description: this.form.get('description')?.value as string,
    };

    this.data ? this.update(book) : this.create(book);

    this.dialogRef.close(true);
  }

  public create(book: IBook) {
    this._bookStore.addBook(book);
  }

  public update(book: IBook) {
    this._bookStore.updateBook(book);
  }

}
