import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  
  // logout method
  logout(): void {
    this.authService.logout(); // delete auth data
    this.router.navigate(['/login']); // navigate to login
  }

  storeManagement(): void {
    this.router.navigate(['/stores']); // navigate to stores
  }

  itemManagement(): void {
    this.router.navigate(['/items']); // navigate to items
  }

  
  home(): void {
    this.router.navigate(['/home']); // navigate to home
  }
}
