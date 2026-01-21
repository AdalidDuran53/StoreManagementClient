import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';
import { ActionResult } from 'src/app/api/models/action-result';
import { Item } from '../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

newItem : Item = { 
    itemCode: '',
    itemDescription: '',
    itemPrice: 0,
    itemStock: 0,
    itemfile: null as any
    };

  constructor(private authService: AuthService, private itemsService: ItemsService, private router: Router) { }

  ngOnInit(): void {
  }

goHome(): void {
    this.router.navigate(['/home']);
  }

   registerItem() { 
      this.itemsService.addItem(this.newItem).subscribe({
         next: (result: ActionResult) => { 
          console.error('result:', result);
          alert('Articulo registrado con éxito'); 
          window.location.reload();
        }, error: (err) => {
          let errorMessage = err.error.code || 'Error en el registro';
          console.error('Error:', err);
           alert(errorMessage); 
          } 
        });
      }

      getItems() { 
      this.itemsService.getItems().subscribe({
         next: (result: ActionResult) => { 
          console.log('result:', result);
          alert('Articulo registrado con éxito'); 
        }, error: (err) => {
          let errorMessage = err.error.code || 'Error en el registro';
          console.error('Error:', err);
           alert(errorMessage); 
          } 
        });
      }
}
