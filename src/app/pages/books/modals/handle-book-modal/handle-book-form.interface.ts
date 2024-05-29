import { FormControl } from '@angular/forms';

export interface HandleBook {
  name: FormControl<string>;
  author: FormControl<string>;
  year: FormControl<string>;
  description: FormControl<string>;
}
