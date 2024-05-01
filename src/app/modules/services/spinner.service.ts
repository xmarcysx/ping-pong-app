import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  showSpinner = signal(false);

  toTrue() {
    this.showSpinner.set(true);
  }

  toFalse() {
    setTimeout(() => this.showSpinner.set(false), 500);
  }
}
