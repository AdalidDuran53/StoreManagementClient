import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActionResult } from '../api/models/action-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.userName, this.password).subscribe({
      next: (result: ActionResult) => {
        this.message = 'Login exitoso';
        // store auth data in session storage
        sessionStorage.setItem('authData', JSON.stringify(result));
        // navigate to home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // show error message
        this.message = 'Error en login';
        console.error('Error:', err);
      }
    });
  }
}

