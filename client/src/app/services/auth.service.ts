import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '../types/user.interface';
import { AlertService, httpAlert } from './alert.service';

const USERLSKEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly loggedInUserChange$ = new EventEmitter<IUser | null>();

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {
    // tslint:disable-next-line: deprecation
    this.http.get<IUser>('/api/auth').subscribe({
      next: this.setLoggedInUser.bind(this),
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.setLoggedInUser(null);
        } else {
          this.alertService.postAlert(`${error.status} ${error.statusText}`);
        }
      },
    });
  }

  public getLoggedInUser(): IUser | null {
    const userJson = localStorage.getItem(USERLSKEY);
    return userJson && JSON.parse(userJson);
  }

  private setLoggedInUser(user: IUser | null): void {
    const prevUser = this.getLoggedInUser();
    if (user) {
      localStorage.setItem(USERLSKEY, JSON.stringify(user));
    }
    else {
      localStorage.removeItem(USERLSKEY);
    }
    if (user?._id !== prevUser?._id) {
      this.loggedInUserChange$.emit(user);
    }
  }

  /**
   * Log in.
   * @param email E-Mail
   * @param password Password
   */
  public logInRx(email: string, password: string): Observable<IUser | null> {
    return this.http.put<IUser>('/api/auth', new HttpParams({ fromObject: { email, password } })).pipe(
      httpAlert(this.alertService),
      tap(this.setLoggedInUser.bind(this)),
    );
  }

  /**
   * Log out.
   */
  public logOutRx(): Observable<void> {
    this.setLoggedInUser(null);
    return this.http.delete<void>('/api/auth');
  }

}
