import { Component } from '@angular/core';
import { FormSubmitBtnComponent } from '../form-submit-btn/form-submit-btn.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../modules/models/user';
import { ToastService } from '../../modules/services/toast.service';
import { GetFromFirebaseService } from '../../modules/services/get-from-firebase.service';
import { SpinnerService } from '../../modules/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-king-of-the-day',
  standalone: true,
  imports: [FormSubmitBtnComponent],
  templateUrl: './save-king-of-the-day.component.html',
  styleUrl: './save-king-of-the-day.component.scss',
})
export class SaveKingOfTheDayComponent {
  players: User[] | undefined = [];

  constructor(
    private _dynamicDialogConfig: DynamicDialogConfig,
    private _dynamicDialogRef: DynamicDialogRef,
    private _toastService: ToastService,
    private _spinnerService: SpinnerService,
    private _router: Router,
    private _getFromFirebaseService: GetFromFirebaseService
  ) {}

  ngOnInit() {
    this._readConfig();
  }

  close() {
    this._dynamicDialogRef.close();
  }

  save() {
    if (this.players?.length === 1) {
      this._dynamicDialogRef.close();
      this._spinnerService.toTrue();
      this._getFromFirebaseService.updateUserKingOfTheDay(this.players[0]);
      this._router.navigateByUrl('/krol-dnia');
    } else {
      this._toastService.error('Brak rozstrzygnięcia. Król jest tylko jeden.');
    }
  }

  private _readConfig() {
    this.players = this._dynamicDialogConfig.data.winners;
  }
}
