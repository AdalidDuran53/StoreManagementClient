import { Component, OnInit } from '@angular/core';
import { ItemClient } from '../models/item-client';
import { ItemClientService } from '../services/item-client.service';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { ItemCart } from '../models/item-cart';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { ActionResult } from '../api/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private itemClientService: ItemClientService, private itemService: ItemService, private router: Router) { this.getItemsClient(); }

  ngOnInit(): void {
  }

  itemClientList : ItemClient[] = [  ];
  itemList : Item[] = [  ];
  itemCartList : ItemCart[] = [  ];

  subTotal = 0;
  tax = 0;
  Total = 0;

  // get items in cart
  getItemsClient() {
    this.itemClientService.getItems().subscribe({
               next: (result) => {
                // populate itemsClientList
                this.itemClientList = result.data as ItemClient[];
                this.getItems() ;
               },
               error: (err) => {
                 console.error('Error fetching cart items:', err);
               }
             });
  }

  // get items general information
  getItems() {
    this.itemService.getItems().subscribe({
               next: (result) => {
                this.itemList = result.data as Item[];
                this.mapToItemCart();
               },
               error: (err) => {
                 console.error('Error fetching items:', err);
               }
             });
      }

      // method to map items
      mapToItemCart() {
        this.itemCartList = this.itemClientList.map(ic => {
          const itemDetails = this.itemList.find(i => i.itemId === ic.itemId);
          return {
            itemId: ic.itemId,
            itemAmount: ic.itemAmount,
            operationDate: ic.operationDate,
            itemPrice: itemDetails?.itemPrice,
            itemStock: itemDetails?.itemStock,
            itemSubtotal:itemDetails ? itemDetails.itemPrice * ic.itemAmount : 0,
            itemDescription: itemDetails?.itemDescription,
            itemCode: itemDetails?.itemCode,
            itemImg: itemDetails?.itemImg || new File([], '')
          } as ItemCart;
        });

        this.subTotal = this.itemCartList.reduce((acc: number, item: any) => acc + (item.itemSubtotal || 0), 0);
        this.tax = this.subTotal*0.16;
        this.Total = this.subTotal + this.tax;
      }

      sellItems(){
        this.itemClientService.sell().subscribe({
               next: (result) => {
                alert('Gracias por su compra');
                this.router.navigate(['/home']); 
               },
               error: (err) => {
                 console.error('Error fetching items:', err);
               }
             });
      }

      removeItems(itemCart : ItemCart){
        const item = this.mapItemCarttoItem(itemCart);

        this.itemClientService.delete(item).subscribe({
               next: (result) => {
                window.location.reload();
               },
               error: (err) => {
                 console.error('Error fetching items:', err);
               }
             });
      }

      // method to add item
        addItem(itemCart : ItemCart) {
           const item = this.mapItemCarttoItem(itemCart);
          if(((this.itemClientList.find(ic => ic.itemId === item.itemId)?.itemAmount ?? 0) + 1 || 1) > item.itemStock){
            alert('No hay stock disponible para este artículo');
            return;
          }
          // increase item amount if already in list
          item.itemAmount = (this.itemClientList.find(ic => ic.itemId === item.itemId)?.itemAmount ?? 0) + 1 || 1;
          // register or update item in client items
          if(this.itemClientList.some(ic => ic.itemId === item.itemId)){
            // delete existing item first
            this.itemClientService.delete(item).subscribe({
                        next: (result: ActionResult) => {
                          // then register updated item
                          this.itemRegister(item);
                        },
                        error: (err) => {
                          console.error('Error fetching items:', err);
                        }
            });
          }
          else{
            // register new item
              this.itemRegister(item);
              }
        }
        loading = false;
        // method to remove item
        removeItem(itemCart : ItemCart) {
           const item = this.mapItemCarttoItem(itemCart);
          // decrease item amount if already in list
          if(this.itemClientList.some(ic => ic.itemId === item.itemId)){
            item.itemAmount = (this.itemClientList.find(ic => ic.itemId === item.itemId)?.itemAmount ?? 0) - 1 || 0;
            // delete existing item first
            this.itemClientService.delete(item).subscribe({
                        next: (result: ActionResult) => {
                          // then register updated item if amount > 0
                          if(item.itemAmount && item.itemAmount > 0){
                            this.itemRegister(item);
                          }else{
                            this.getItemsClient();
                          }
                        },
                        error: (err) => {
                          console.error('Error fetching items:', err);
                        }
            });
          }
        }
      
        // method to register item in client items
        itemRegister(item: Item) {
          this.itemClientService.register(item).subscribe({
                     next: (result: ActionResult) => {
                      this.getItemsClient();
                     },
                     error: (err) => {
                       console.error('Error registering item:', err);
                     }
                   });
          }

          // map itemCart to Item
          mapItemCarttoItem(itemCart : ItemCart){
            const item : Item = { 
              itemId: itemCart.itemId, 
              itemCode: itemCart.itemCode ?? '',
              itemDescription: '',
              itemPrice: itemCart.itemPrice ?? 0,
              itemStock: itemCart.itemStock,
              itemAmount: itemCart.itemAmount,
              itemImg: itemCart.itemImg
              };
              
              return item;
          }

}
