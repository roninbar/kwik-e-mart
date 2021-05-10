import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { OperatorFunction, Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public readonly alert: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  postAlert(message: string): void {
    this.alert.emit(message);
  }
}

export function httpAlert<T>(alertService: AlertService): OperatorFunction<T, T> {
  return catchError<T, Observable<never>>(({ status, statusText }: HttpErrorResponse) => {
    alertService.postAlert(`${status} ${statusText}`);
    return EMPTY;
  });
}
