import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../models/store';
import { StoreService } from '../services/store.service';
import { ActionResult } from '../api/models';
import { data } from 'jquery';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent {

newStore : Store  = {
    storeBranch: '',
    storeAddress: ''
}

storeList: Store[] = [ ];

  constructor(private router: Router, private StoreServices: StoreService) { this.getStores(); }

  // store to be updated
  selectedStore: Store | null = null;

  openUpdateModal(store: Store) {
    this.selectedStore = { ...store }; // populate form with store data
    this.newStore = { ...store }; // populate newStore with store data
  }

  openModalRegister() {
    this.selectedStore = null; // clear form for new store
    this.newStore = {
      storeBranch: '',
      storeAddress: ''
    }; // reset newStore
  }

  deleteRegister(store: Store) {
    this.selectedStore = { ...store }; // populate form with store data
  }

   // register new store
   registerStore() { 
    // if selectedStore is null, it's a new store
    if(this.selectedStore == null){
      // register new store
        this.StoreServices.register(this.newStore).subscribe({
            next: (result: ActionResult) => { 
            console.error('result:', result);
            alert('Tienda registrada con éxito'); 
            window.location.reload();
          }, error: (err) => {
            let errorMessage = err.error.code || 'Error en el registro';
            console.error('Error:', err.error.code);
              alert(errorMessage); 
            } 
          });
          // if selectedStore is not null, update existing store
      } else {
        // update existing store
        this.updateStore();
      }
     }
     
   // register new store
   updateStore() { 
    // create updateStore object
    const updateStore: Store = {
      storeId: this.selectedStore?.storeId,
      storeBranch: this.newStore.storeBranch,
      storeAddress: this.newStore.storeAddress
    }
    
     this.StoreServices.update(updateStore).subscribe({
        next: (result: ActionResult) => { 
         console.error('result:', result);
         alert('Tienda actualizada con éxito'); 
         window.location.reload();
       }, error: (err) => {
         let errorMessage = err.error.code || 'Error en el registro';
         console.error('Error:', err.error.code);
          alert(errorMessage); 
         } 
       });
     }

     // get stores
     getStores() {
       this.StoreServices.getStores().subscribe({
         next: (result: ActionResult) => {
          this.storeList = result.data as Store[];
         },
         error: (err) => {
           console.error('Error fetching stores:', err);
         }
       });
     }

     registerDelete() { 
    // create deleteStore object
    const deleteStore: Store = {
      storeId: this.selectedStore?.storeId,
      storeBranch: this.newStore.storeBranch,
      storeAddress: this.newStore.storeAddress
    }
    
     this.StoreServices.delete(deleteStore).subscribe({
        next: (result: ActionResult) => { 
         console.error('result:', result);
         alert('Tienda eliminada con éxito'); 
         window.location.reload();
       }, error: (err) => {
         let errorMessage = err.error.code || 'Error en el registro';
         console.error('Error:', err.error.code);
          alert(errorMessage); 
         } 
       });
     }

}
