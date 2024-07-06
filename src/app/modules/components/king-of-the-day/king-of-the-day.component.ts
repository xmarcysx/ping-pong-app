import { Component, OnInit } from '@angular/core';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-king-of-the-day',
  standalone: true,
  templateUrl: './king-of-the-day.component.html',
  styleUrl: './king-of-the-day.component.scss',
  imports: [FormSubmitBtnComponent, OverlayPanelModule, PaginatorModule],
})
export class KingOfTheDayComponent implements OnInit {
  players: User[] = [];
  playersList: User[] = [];
  first: number = 0;
  rows: number = 5;

  constructor(
    private _router: Router,
    private _getFromFirebaseService: GetFromFirebaseService
  ) {}

  ngOnInit(): void {
    this._getFromFirebaseService.getAllUsers().subscribe((res) => {
      this.players = res!.sort(
        (a, b) => b.kingOfTheDayWins - a.kingOfTheDayWins
      );
      this.playersList = this.players!.slice(0, 5);
    });
  }

  addKingOfTheDay() {
    this._router.navigateByUrl('/krol-dnia/utworz');
  }

  goToKingOfTheDayHistory() {
    this._router.navigateByUrl('/krol-dnia/historia');
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first as number;
    this.rows = event.rows as number;
    const from = (event.page as number) * 5;
    const to = from + 5;
    this.playersList = this.players!.slice(from, to);
  }
}
