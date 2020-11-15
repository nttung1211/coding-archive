import { FormControl } from '@angular/forms';

export class CustomValidators {
  static asyncForbidName(control: FormControl) {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test') {
            resolve({ isForbidden: true });
          } else {
            resolve(null);
          }
        }, 1000);
      }
    )

    return promise
  }

  static forbidName(control: FormControl) {
    if (control.value === 'test') {
      return { isForbidden: true };
    }
  }
}