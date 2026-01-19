import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const authData = this.authService.getAuthData();

    // if there is auth data, redirect to home
    if (authData) {
      this.router.navigate(['/home']);
      return false;
    }
    // allow access to login
    return true;
  }
}
