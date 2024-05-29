import { FormGroup, FormControl, FormArray } from '@angular/forms';

export const validateAllFormFields = (formGroup?: FormGroup) => {
  if (!formGroup) {
    return;
  }

  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);

    if (control instanceof FormControl) {
      control?.markAsDirty({ onlySelf: true });
      control?.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    } else if (control instanceof FormArray) {
      control.controls.forEach((element) => {
        validateAllFormFields(element as FormGroup);
      });
    }
  });
};
