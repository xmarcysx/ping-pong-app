import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  showSpinner = signal(false);
  showInnerSpinner = signal(false);

  toTrue() {
    this.showSpinner.set(true);
  }

  toTrueInnerSpinner() {
    this.showInnerSpinner.set(true);
  }

  toFalse() {
    setTimeout(() => this.showSpinner.set(false), 500);
  }

  toFalseInnerSpinner() {
    this.showInnerSpinner.set(false);
  }
}
