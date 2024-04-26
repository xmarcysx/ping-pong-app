import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor() {}

  getForm() {
    return new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      passwordRepeat: new FormControl(),
    });
  }
}
