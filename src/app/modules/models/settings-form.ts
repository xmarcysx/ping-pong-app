import { FormControl } from '@angular/forms';

export interface SettingsForm {
  username: FormControl;
  image: FormControl;
}

export interface SettingsFormValue {
  username: string;
  image: string;
}
