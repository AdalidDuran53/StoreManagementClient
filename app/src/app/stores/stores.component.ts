import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../models/store';
import { StoreService } from '../services/store.service';
import { ActionResult } from '../api/models';

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
  constructor(private router: Router, private StoreServices: StoreService) { }

  // nagigate to home
  home(): void {
    this.router.navigate(['/home']); // navigate to home
  }

   // register new store
   registerStore() { 
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
     }

}
