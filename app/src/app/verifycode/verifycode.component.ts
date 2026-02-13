import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActionResult } from '../api/models';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.css']
})
export class VerifycodeComponent implements OnInit {
  code: string = ''; 
  submitted = false; 
  verificationResult: string | null = null;

  // Control del botón de nuevo código 
  canRequestNewCode = true; 
  countdown = 0; 
  timer: any;
  constructor(private authService: AuthService, private router: Router, private loaderServices : LoaderService) { }

  ngOnInit(): void {
  }

    onSubmit() { 
      this.addLoader();
      this.submitted = true; 
      const pattern = /^[0-9]{6}$/; 
        if (!pattern.test(this.code)) 
          { 
            this.verificationResult = 'El código debe tener 6 dígitos'; 
            return; 
          } 
       this.authService.VerifyCode(this.code).subscribe({
        next: (result: ActionResult) => {
          this.verificationResult = 'código verificado';
          const authObject = this.authService.getAuthDataObject();
          authObject.data = null;
          // store auth data in session storage
          sessionStorage.setItem('authData', JSON.stringify(authObject));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          // show error message
          this.verificationResult = 'Error al verificar el código';
          console.error('Error:', err);
        }
      });
        }
        
    requestNewCode(){
      this.addLoader();
    this.canRequestNewCode = false; 
    this.countdown = 60; 
    this.authService.requestVerifyCode().subscribe({
        next: (result: ActionResult) => {
          this.verificationResult = 'nuevo código solictado';
          const authObject = this.authService.getAuthDataObject();
          authObject.data = result.data;
          // store auth data in session storage
          sessionStorage.setItem('authData', JSON.stringify(authObject));
        },
        error: (err) => {
          // show error message
          this.verificationResult = 'Error al solicitar código';
          console.error('Error:', err);
        }
      });
  this.timer = setInterval(() => {
     this.countdown--; 
     if (this.countdown <= 0) 
      { 
        clearInterval(this.timer); this.canRequestNewCode = true;
       }
       }, 1000);

  }
  logout(){
    this.addLoader();
    this.authService.logout(); // delete auth data
    this.router.navigate(['/login']); // navigate to login
  }

  addLoader(){
    this.loaderServices.addDefaultLoader();
  }

}
