import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UrlTree {
    const user = this.authService.getLoggedInUser();
    return (
      user?.role === 'admin' && this.router.parseUrl('/admin') ||
      user?.role === 'customer' && this.router.parseUrl('/customer') ||
      this.router.parseUrl('/auth')
    );
  }
}
