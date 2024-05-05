import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SettingsForm } from '../../models/settings-form';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { SettingsService } from '../../services/settings.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    FormSubmitBtnComponent,
  ],
})
export class SettingsComponent implements OnInit {
  form!: FormGroup<SettingsForm>;

  constructor(
    private _settingsService: SettingsService,
    private _toastService: ToastService,
    private _spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.form = this._settingsService.getForm();
  }

  save() {
    const fValue = this.form.getRawValue();
    const imageExtension = fValue?.image?.toLocaleLowerCase().split('.').pop();

    if (this.form.valid) {
      if (imageExtension !== 'png' && imageExtension !== 'jpg') {
        this._toastService.error('Zdjęcie musi być w formacie IMG lub PNG');
        return;
      }

      this._spinnerService.toTrue();
      this._settingsService.save(fValue).subscribe();
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
