import { AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }

  public handleError(control: AbstractControl<any, any> | null, fieldName?: string): string {
    if (control?.hasError('required')) {
      return `The ${fieldName ?? 'input field'} is required`;
    }
    return 'Error';
  }
}
