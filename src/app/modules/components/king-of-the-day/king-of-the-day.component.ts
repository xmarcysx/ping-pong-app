import { Component } from '@angular/core';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-king-of-the-day',
  standalone: true,
  templateUrl: './king-of-the-day.component.html',
  styleUrl: './king-of-the-day.component.scss',
  imports: [FormSubmitBtnComponent],
})
export class KingOfTheDayComponent {
  constructor(private _router: Router) {}

  addKingOfTheDay() {
    this._router.navigateByUrl('/krol-dnia/utworz');
  }
}
