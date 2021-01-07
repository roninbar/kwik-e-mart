import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { IUser } from './user.interface';

const USERLSKEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {
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
    return this.http.put<IUser>('/api/auth', new HttpParams({ fromObject: { email, password } })).pipe(
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
