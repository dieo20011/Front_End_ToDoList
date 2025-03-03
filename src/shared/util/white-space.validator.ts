import { AbstractControl } from '@angular/forms';

export function whitespaceValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && /^\s*$/.test(control.value)) {
    return { whitespace: true };
  }
  return null;
}
