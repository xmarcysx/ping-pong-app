import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  imports: [
    FormSubmitBtnComponent,
    ReactiveFormsModule,
    FormSubmitBtnComponent,
  ],
})
export class RegistrationComponent implements OnInit {
  @Output() changeFormToLogin = new EventEmitter<boolean>();

  form!: FormGroup<RegistrationForm>;

  constructor(private _registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.form = this._registrationService.getForm();
  }

  save() {
    console.log(this.form.value);
  }
}
