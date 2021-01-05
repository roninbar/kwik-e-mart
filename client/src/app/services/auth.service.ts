import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from './user.interface';

const USERLSKEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  public getLoggedInUser(): IUser | null {
    const userJson = localStorage.getItem(USERLSKEY);
    return userJson && JSON.parse(userJson);
  }

  private setLoggedInUser(user: IUser): void {
    if (user) {
      localStorage.setItem(USERLSKEY, JSON.stringify(user));
    }
    else {
      localStorage.removeItem(USERLSKEY);
    }
  }

  /**
   * Log in.
   * @param email E-Mail
   * @param password Password
   */
  public logInRx(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>('/api/auth/login', new HttpParams({ fromObject: { email, password } })).pipe(
      tap(user => {
        this.setLoggedInUser(user);
        return user;
      }),
    );
  }

  /**
   * Log out.
   */
  public logOutRx(): Observable<void> {
    this.setLoggedInUser(null);
    return this.http.post<void>('/api/auth/logout', null);
  }

}
