import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  constructor() {}

  getForm() {
    return new FormGroup({
      email: new FormControl(),
    });
  }
}
