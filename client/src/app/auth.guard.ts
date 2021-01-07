import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    const destination = route.url[0]?.path;
    const loggedIn = Boolean(this.authService.getLoggedInUser());
    return destination === 'login' || destination === 'signup'
      ? !loggedIn
      : loggedIn || this.router.navigateByUrl('/login');
  }

}
