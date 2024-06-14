import { Component, OnInit } from '@angular/core';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
@Component({
  selector: 'app-king-of-the-day',
  standalone: true,
  templateUrl: './king-of-the-day.component.html',
  styleUrl: './king-of-the-day.component.scss',
  imports: [FormSubmitBtnComponent, OverlayPanelModule],
})
export class KingOfTheDayComponent implements OnInit {
  players: User[] | undefined = [];

  constructor(
    private _router: Router,
    private _getFromFirebaseService: GetFromFirebaseService
  ) {}

  ngOnInit(): void {
    this._getFromFirebaseService.getAllUsers().subscribe((res) => {
      this.players = res?.sort(
        (a, b) => b.kingOfTheDayWins - a.kingOfTheDayWins
      );
    });
  }

  addKingOfTheDay() {
    this._router.navigateByUrl('/krol-dnia/utworz');
  }
}
