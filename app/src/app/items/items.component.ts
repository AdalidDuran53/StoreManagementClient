import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../models/item';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActionResult } from '../api/models';
import { ItemService } from '../services/item.service';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  newItem : Item  = {
    itemCode: '',
    itemDescription: '',
    itemPrice: 0,
    itemStock: 0,
    itemImg: null as any
}
  itemList: Item[] = [ ];
  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  home(): void {
    this.router.navigate(['/home']); // navigate to home
  }

  selectedItem: Item | null = null;

  openUpdateModal(item: Item) {
    this.selectedItem = { ...item }; // populate form with item data
  }

  openModalRegister() {
    this.selectedItem = null; // clear form for new item
  }


  onFileSelected(event: any) { 
  const file: File = event.target.files[0]; 
  this.newItem.itemImg = file; 
  }
 registerItem() { 
    // if selectedItem is null, it's a new item
    if(this.selectedItem == null){
      // register new item
        this.itemService.register(this.newItem).subscribe({
            next: (result: ActionResult) => { 
            console.error('result:', result);
            alert('Articulo registrado con éxito'); 
            window.location.reload();
          }, error: (err) => {
            let errorMessage = err.error.code || 'Error en el registro';
            console.error('Error:', err.error.code);
              alert(errorMessage); 
            } 
          });
          // if selectedItem is not null, update existing item
      } else {
        // update existing item
        this.updateItem();
      }
     }

     // update existing item
  updateItem() {
    if(this.selectedItem){

      // create updateItem object
      const updateItem = this.selectedItem;
      updateItem.itemCode = this.newItem.itemCode;
      updateItem.itemDescription = this.newItem.itemDescription;
      updateItem.itemPrice = this.newItem.itemPrice;
      updateItem.itemStock = this.newItem.itemStock;
      updateItem.itemImg = this.newItem.itemImg;

      // call update method
      this.itemService.update(updateItem).subscribe({
        next: (result: ActionResult) => { 
          console.error('result:', result);
          alert('Articulo actualizado con éxito'); 
          window.location.reload();
        }, error: (err) => {
          let errorMessage = err.error.code || 'Error en la actualización';
          console.error('Error:', err.error.code);
            alert(errorMessage); 
          } 
        });
    }
  }

  // get items
    getItems() {
         this.itemService.getItems().subscribe({
           next: (result: ActionResult) => {
            this.itemList = result.data as Item[];
           },
           error: (err) => {
             console.error('Error fetching items:', err);
           }
         });
       }

registerDelete() { 
    // create deleteItem object
    const deleteItem: Item = {
      itemId: this.selectedItem?.itemId,
      itemCode: this.newItem.itemCode,
      itemDescription: this.newItem.itemDescription,
      itemPrice: this.newItem.itemPrice,
      itemStock: this.newItem.itemStock,
      itemImg: this.newItem.itemImg
    }

     this.itemService.delete(deleteItem).subscribe({
        next: (result: ActionResult) => { 
         console.error('result:', result);
         alert('Articulo eliminado con éxito'); 
         window.location.reload();
       }, error: (err) => {
         let errorMessage = err.error.code || 'Error en el registro';
         console.error('Error:', err.error.code);
          alert(errorMessage); 
         } 
       });
  }

  
}
