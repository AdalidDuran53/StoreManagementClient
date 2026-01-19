import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const authData = this.authService.getAuthData();

    if (!authData) {
      // if user is not logged in, redirect to login
      this.router.navigate(['/login']);
      return false; // block access
    }

    return true; // allow access
  }

  
}
