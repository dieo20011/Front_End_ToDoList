import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateValidator {
  static dateRange(date1Path: string, date2Path: string): ValidatorFn {
    return (form: AbstractControl): { dateRange: true } | null => {
      const date1 = form.get(date1Path);
      const date2 = form.get(date2Path);

      if (!(date1?.value && date2?.value)) return null;

      const date1RawValue = new Date(date1.value);
      const date1Value = new Date(
        date1RawValue.getFullYear(),
        date1RawValue.getMonth(),
        date1RawValue.getDate(),
        date1RawValue.getHours(),
        date1RawValue.getMinutes()
      );
      const date2RawValue = new Date(date2.value);
      const date2Value = new Date(
        date2RawValue.getFullYear(),
        date2RawValue.getMonth(),
        date2RawValue.getDate(),
        date2RawValue.getHours(),
        date2RawValue.getMinutes()
      );

      if (date1Value > date2Value) {
        date1.setErrors({ ...date1.errors, dateRange: true });
        date2.setErrors({ ...date2.errors, dateRange: true });
        return { dateRange: true };
      }

      if (date1.hasError('dateRange') || date2.hasError('dateRange')) {
        if (date1.errors) {
          if (Object.keys(date1.errors).includes('dateRange')) {
            delete date1.errors['dateRange'];
          } else {
            date1.setErrors(null);
          }
        }
        if (date2.errors) {
          if (Object.keys(date2.errors).includes('dateRange')) {
            delete date2.errors['dateRange'];
          } else {
            date2.setErrors(null);
          }
        }
      }

      return null;
    };
  }

  static earlierThanControl(controlPath: string): ValidatorFn {
    return (control: AbstractControl): { earlierThanControl: true } | null => {
      const targetControl = control.parent?.get(controlPath);
      if (!targetControl) return null;

      const target = control.parent?.get(controlPath)?.value as string | Date;
      if (!target) return null;

      const max = new Date(target).setSeconds(0);
      const value = new Date(control.value).setSeconds(0);
      if (value < max) return null;

      return { earlierThanControl: true };
    };
  }
  static laterThanControl(controlPath: string): ValidatorFn {
    return (control: AbstractControl): { laterThanControl: true } | null => {
      const targetControl = control.parent?.get(controlPath);
      if (!targetControl) return null;

      const target = control.parent?.get(controlPath)?.value as string | Date;
      if (!target) return null;

      const min = new Date(target).setSeconds(0);
      const value = new Date(control.value).setSeconds(0);
      if (value > min) return null;

      return { laterThanControl: true };
    };
  }

  static smallerThanNow(): ValidatorFn {
    return (control: AbstractControl): { smallerThanNow: true } | null => {
      const now = new Date().setSeconds(0);
      const value = new Date(control.value).setSeconds(0);
      if (value <= now) return null;

      return { smallerThanNow: true };
    };
  }
}

export class DateValidatorV2 {
  static dateRange(date1Path: string, date2Path: string): ValidatorFn {
    return (form: AbstractControl): { dateRange: true } | null => {
      const date1 = form.get(date1Path);
      const date2 = form.get(date2Path);

      if (date1?.hasError('dateRange')) {
        const errors = date1.errors || {};
        if (errors['dateRange']) {
          delete errors['dateRange'];
        }
        date1.setErrors(Object.keys(errors).length ? errors : null);
      }

      if (date2?.hasError('dateRange')) {
        const errors = date2.errors || {};
        if (errors['dateRange']) {
          delete errors['dateRange'];
        }
        date2.setErrors(Object.keys(errors).length ? errors : null);
      }

      if (!(date1?.value && date2?.value)) return null;

      const date1RawValue = new Date(date1.value);
      const date1Value = new Date(
        date1RawValue.getFullYear(),
        date1RawValue.getMonth(),
        date1RawValue.getDate(),
        date1RawValue.getHours(),
        date1RawValue.getMinutes()
      );
      const date2RawValue = new Date(date2.value);
      const date2Value = new Date(
        date2RawValue.getFullYear(),
        date2RawValue.getMonth(),
        date2RawValue.getDate(),
        date2RawValue.getHours(),
        date2RawValue.getMinutes()
      );
      if (date1Value > date2Value) {
        date1.setErrors({ dateRange: true });
        date2.setErrors({ dateRange: true });
        return { dateRange: true };
      }

      if (date1.hasError('dateRange') || date2.hasError('dateRange')) {
        if (date1.errors) {
          if (Object.keys(date1.errors).length > 1) {
            delete date1.errors['dateRange'];
          } else {
            date1.setErrors(null);
          }
        }
        if (date2.errors) {
          if (Object.keys(date2.errors).length > 1) {
            delete date2.errors['dateRange'];
          } else {
            date2.setErrors(null);
          }
        }
      }

      return null;
    };
  }
}

export class DateValidatorWithoutTime {
  static dateRange(date1Path: string, date2Path: string): ValidatorFn {
    return (form: AbstractControl): { dateRange: true } | null => {
      const date1 = form.get(date1Path);
      const date2 = form.get(date2Path);

      if (date1?.hasError('dateRange')) {
        const errors = date1.errors || {};
        if (errors['dateRange']) {
          delete errors['dateRange'];
        }
        date1.setErrors(Object.keys(errors).length ? errors : null);
      }

      if (date2?.hasError('dateRange')) {
        const errors = date2.errors || {};
        if (errors['dateRange']) {
          delete errors['dateRange'];
        }
        date2.setErrors(Object.keys(errors).length ? errors : null);
      }

      if (!(date1?.value && date2?.value)) return null;

      const date1Value = new Date(date1.value);
      const date2Value = new Date(date2.value);

      date1Value.setHours(0, 0, 0, 0);
      date2Value.setHours(0, 0, 0, 0);

      if (date1Value > date2Value) {
        date1.setErrors({ dateRange: true });
        date2.setErrors({ dateRange: true });
        return { dateRange: true };
      }

      if (date1.hasError('dateRange') || date2.hasError('dateRange')) {
        if (date1.errors) {
          if (Object.keys(date1.errors).length > 1) {
            delete date1.errors['dateRange'];
          } else {
            date1.setErrors(null);
          }
        }
        if (date2.errors) {
          if (Object.keys(date2.errors).length > 1) {
            delete date2.errors['dateRange'];
          } else {
            date2.setErrors(null);
          }
        }
      }

      return null;
    };
  }
}

