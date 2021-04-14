import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alert: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  postAlert(message: string): void {
    this.alert.emit(message);
  }
}
