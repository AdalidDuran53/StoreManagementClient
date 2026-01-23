import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartService } from '../services/cart.service';
import { ItemClientService } from '../services/item-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount$ = this.cartService.cartCount$;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { this.updateCartCount();}

  ngOnInit(): void {
  }

  private cartCountSubject = new BehaviorSubject<number>(0);
  
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

  cart(): void {
    this.router.navigate(['/cart']); // navigate to cart
  }

  // method to update cart count
  updateCartCount(): void {
    this.cartService.updateCartCount();
  }


}
