import { FormControl } from '@angular/forms';

export interface RegistrationForm {
  username: FormControl;
  email: FormControl;
  password: FormControl;
  passwordRepeat: FormControl;
}
