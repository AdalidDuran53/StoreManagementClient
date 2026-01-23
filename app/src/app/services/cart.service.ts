import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ItemClientService } from './item-client.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cartCountSubject = new BehaviorSubject<number>(0); 
cartCount$ = this.cartCountSubject.asObservable();
  constructor(private itemClientService: ItemClientService) { }

  // method to update cart count observable
  updateCount(count: number) { this.cartCountSubject.next(count); }

  // method to update cart count with total items in cart
  updateCartCount(): void {
    this.itemClientService.getItems().subscribe({
      next: (result) => {
        const itemsClientList = result.data;
        const count = itemsClientList.reduce((acc: number, item: any) => acc + (item.itemAmount || 0), 0);
        this.updateCount(count);
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
  }
}
