import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor() {}

  getForm() {
    return new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }
}
