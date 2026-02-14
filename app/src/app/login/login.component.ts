import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActionResult } from '../api/models/action-result';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message = '';
  loginForm: FormGroup;
  newUserForm: FormGroup;
  // new user object for registration
  newUser = { 
    userName: '',
    password: '',
    clientName: '',
    clientLastName: '',
    clientAddress: ''
    };

  constructor(private authService: AuthService, private router: Router, private loaderServices : LoaderService, private fb: FormBuilder) { 
    this.loginForm = this.fb.group({ 
      userName: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required] 
    });

    this.newUserForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      clientName: ['', Validators.required],
      clientLastName: ['', Validators.required],
      clientAddress: ['', Validators.required]
    });

  }

  onLogin() {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.addLoader();
    const { userName, password } = this.loginForm.value;
    this.authService.login(userName, password).subscribe({
      next: (result: ActionResult) => {
        this.message = 'Login exitoso';
        // store auth data in session storage
        sessionStorage.setItem('authData', JSON.stringify(result));
        
        const authObject = this.authService.getAuthDataObject();
        if(authObject.data != '' && authObject.data != null && authObject.data != undefined){
          this.router.navigate(['/Verifycode']);
        }else {
          // navigate to home
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        // show error message
        this.message = 'Error en login';
        console.error('Error:', err);
      }
    });
  }

  // register new user
  registerUser() { 
    if (this.newUserForm.invalid) { this.newUserForm.markAllAsTouched(); return; }
    this.addLoader();
    this.newUser = this.newUserForm.value;
    this.authService.register(this.newUser).subscribe({
       next: (result: ActionResult) => { 
        console.error('result:', result);
        alert('Usuario registrado con éxito'); 
        window.location.reload();
      }, error: (err) => {
        let errorMessage = err.error.code || 'Error en el registro';
        console.error('Error:', err.error.code);
         alert(errorMessage); 
        } 
      });
    }

    addLoader(){
    this.loaderServices.addDefaultLoader();
  }
}

