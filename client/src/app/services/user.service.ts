import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../types/user.interface';
import { AlertService, httpAlert } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  createRx(user: { _id: string }): Observable<IUser> {
    return this.http.put<IUser>(`/api/user/${user._id}`, new HttpParams({ fromObject: user }))
      .pipe(httpAlert(this.alertService));
  }
}

