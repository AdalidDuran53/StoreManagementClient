import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { ActionResult } from '../api/models';
import { ItemClientService } from '../services/item-client.service';
import { ItemClient } from '../models/item-client';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private itemService: ItemService, private itemClientService: ItemClientService) { this.getItems(); }

  ngOnInit(): void {
  }

  itemList : Item[] = [ ];
  itemsClientList : ItemClient[] = [ ];

  // method to get items
  getItems() {
    this.itemService.getItems().subscribe({
               next: (result: ActionResult) => {
                this.itemList = result.data as Item[];
                this.getItemsClient();
               },
               error: (err) => {
                 console.error('Error fetching items:', err);
               }
             });
  }

  // method to get client items
  getItemsClient() {
    this.itemClientService.getItems().subscribe({
               next: (result: ActionResult) => {
                // populate itemsClientList
                this.itemsClientList = result.data as ItemClient[];
                // update itemList with amounts from itemsClientList
                this.itemList.forEach(element => {
                  if(this.itemsClientList.some(ic => ic.itemId === element.itemId)){
                    element.itemAmount = this.itemsClientList.find(ic => ic.itemId === element.itemId)?.itemAmount || 0;
                  }
                });
               },
               error: (err) => {
                 console.error('Error fetching items:', err);
               }
             });
  }

  // method to add item
  addItem(item : Item) {
    this.addLoading();
    if(((this.itemsClientList.find(ic => ic.itemId === item.itemId)?.itemAmount ?? 0) + 1 || 1) > item.itemStock){
      alert('No hay stock disponible para este artículo');
      return;
    }
    // increase item amount if already in list
    item.itemAmount = (this.itemsClientList.find(ic => ic.itemId === item.itemId)?.itemAmount ?? 0) + 1 || 1;
    // register or update item in client items
    if(this.itemsClientList.some(ic => ic.itemId === item.itemId)){
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
  removeItem(item : Item) {
    this.addLoading();
    // decrease item amount if already in list
    if(this.itemsClientList.some(ic => ic.itemId === item.itemId)){
      item.itemAmount = (this.itemsClientList.find(ic => ic.itemId === item.itemId)?.itemAmount ?? 0) - 1 || 0;
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

    addLoading() : void {
      this.loading = true; // show loading spinner
      setTimeout(() => { this.loading = false; }, 1500);
    }
}
