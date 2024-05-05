import { Component, OnInit } from '@angular/core';
import { GetFromFirebaseService } from '../../modules/services/get-from-firebase.service';
import { AuthService } from '../../modules/services/auth.service';
import { User } from '../../modules/models/user';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { FormSubmitBtnComponent } from '../form-submit-btn/form-submit-btn.component';

@Component({
  selector: 'app-add-match',
  standalone: true,
  templateUrl: './add-match.component.html',
  styleUrl: './add-match.component.scss',
  imports: [FormsModule, DropdownModule, RatingModule, FormSubmitBtnComponent],
})
export class AddMatchComponent implements OnInit {
  rivalList: User[] | undefined;
  rival: User | undefined;
  scoreList = [
    { id: 0, label: '0' },
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
  ];

  constructor(
    private _authService: AuthService,
    private _getFromFirebase: GetFromFirebaseService
  ) {}

  ngOnInit(): void {
    this._getRivalList();
  }

  save() {}

  private _getRivalList() {
    const currentUserUid = this._authService.currentUser()?.uid;
    this._getFromFirebase.getRivalsList(currentUserUid).subscribe((res) => {
      this.rivalList = res;
    });
  }
}
