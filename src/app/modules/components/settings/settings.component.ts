import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SettingsForm } from '../../models/settings-form';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { SettingsService } from '../../services/settings.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';

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
    private _spinnerService: SpinnerService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this._settingsService.getForm();
    this._patchValue();
  }

  @HostListener('keydown.enter')
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

  private _patchValue() {
    const user = this._authService.currentUser();

    this.form.patchValue({
      image: user?.profileImg,
      username: user?.username,
    });
  }
}
