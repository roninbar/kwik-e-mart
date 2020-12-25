import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from './user.interface';

const NOUSER = { username: '', name: { first: '', last: '' } };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: IUser = NOUSER;

  constructor(
    private http: HttpClient,
  ) { }

  public userIsLoggedIn(): boolean {
    return Boolean(this.loggedInUser.username);
  }

  public getLoggedInUser(): IUser {
    return this.loggedInUser;
  }

  /**
   * Log in.
   * @param username Username
   * @param password Password
   */
  public logInRx(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>('/api/auth/login', new HttpParams({ fromObject: { username, password } })).pipe(
      tap(user => {
        this.loggedInUser = user;
        return user;
      }),
    );
  }

  /**
   * Log out.
   */
  public logOutRx(): Observable<void> {
    this.loggedInUser = NOUSER;
    return this.http.post<void>('/api/auth/logout', null);
  }
}
