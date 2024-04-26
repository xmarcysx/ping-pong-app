import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-submit-btn',
  standalone: true,
  imports: [],
  templateUrl: './form-submit-btn.component.html',
  styleUrl: './form-submit-btn.component.scss',
})
export class FormSubmitBtnComponent {
  @Output() btnClicked = new EventEmitter();
  @Input() title = '';
}
