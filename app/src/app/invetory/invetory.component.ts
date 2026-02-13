import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { Store } from '../models/store';
import { ItemInventory } from '../models/item-inventory';
import { Item } from '../models/item';
import { ActionResult } from '../api/models';
import { ItemService } from '../services/item.service';
import { ItemStoreService } from '../services/item-store.service';
import { ItemStore } from '../models/item-store';

@Component({
  selector: 'app-invetory',
  templateUrl: './invetory.component.html',
  styleUrls: ['./invetory.component.css']
})
export class InvetoryComponent implements OnInit {

  currentStore : Store = {
    storeBranch: '',
    storeAddress: ''
}
  currentItem : Item = {
    
    itemId: '',
    itemCode: '',
    itemDescription: '',
    itemPrice: 0,
    itemStock: 0,
    itemImg: null as any
  }

  newItemInventory : ItemInventory = {
    store: this.currentStore,
    item: this.currentItem
  }

  itemList : Item[] = [];

  itemInventoryList : Item[] = [];

  itemStoreList : ItemStore[] = [];

  constructor(private loaderServices : LoaderService, private router: Router, private itemService : ItemService, private itemStoreService : ItemStoreService) { 
    this.addLoader(); 
    const navegation = this.router.getCurrentNavigation();
    this.currentStore = navegation?.extras.state?.['store'] as Store;
    if(this.currentStore == undefined || this.currentStore == null)
      this.currentStore = JSON.parse(sessionStorage.getItem('store') || '{}');
    if(this.currentStore == undefined || this.currentStore == null)
      this.router.navigate(['/stores']);
    
    this.getItemsInventory();
  }

  ngOnInit(): void {
  }

  addLoader(){
    this.loaderServices.addDefaultLoader();
  }

  registerInventory(item : Item){
    this.newItemInventory = {
      store: this.currentStore,
      item: item
    }
    this.itemStoreService.register(this.newItemInventory).subscribe({
                 next: (result: ActionResult) => {
                  this.beforeReload(this.currentStore);
                 },
                 error: (err) => {
                   console.error('Error fetching items:', err);
                 }
               });

  }

  getItems() {
      this.itemService.getItems().subscribe({
                 next: (result: ActionResult) => {
                  this.itemList = result.data as Item[];

                  this.itemList.forEach(element => {
                  if(this.itemStoreList.some(ic => ic.itemId === element.itemId)){
                    this.itemInventoryList.push(element);
                    this.itemList = this.itemList.filter(item => item.itemId !== element.itemId);
                  }
                });
                 },
                 error: (err) => {
                   console.error('Error fetching items:', err);
                 }
               });
    }

     getItemsInventory() {
      this.itemStoreService.getItems(this.currentStore).subscribe({
                 next: (result: ActionResult) => {
                  this.itemStoreList = result.data as ItemStore[];
                  this.getItems();
                 },
                 error: (err) => {
                   console.error('Error fetching items:', err);
                 }
               });
    }

    inventory(store: Store){
          this.router.navigate(['/inventory'], { state: { store } })
      .then(() => window.location.reload());
    }

    openUpdateModal(item: Item){
      this.currentItem = item;
    }

    deleteRegister(){
      
    this.newItemInventory = {
      store: this.currentStore,
      item: this.currentItem
    }
  this.itemStoreService.delete(this.newItemInventory).subscribe({
                 next: (result: ActionResult) => {
                  this.beforeReload(this.currentStore);
                 },
                 error: (err) => {
                   console.error('Error fetching items:', err);
                 }
               });
    }

    beforeReload(store : Store){
      sessionStorage.setItem('store', JSON.stringify(store)); 
      window.location.reload();
    }

}
