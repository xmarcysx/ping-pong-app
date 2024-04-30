import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private _messageService: MessageService) {}

  success(detail: string, summary: string = 'Sukces') {
    this._messageService.add({
      severity: 'success',
      summary,
      detail,
    });
  }

  error(detail: string, summary: string = 'Błąd') {
    this._messageService.add({
      severity: 'error',
      summary,
      detail,
    });
  }
}
