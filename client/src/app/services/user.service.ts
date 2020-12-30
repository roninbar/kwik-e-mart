import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  createRx(user): Observable<IUser> {
    return this.http.put<IUser>(`/api/user/${user._id}`, new HttpParams({ fromObject: user }));
  }
}
