import { Injectable } from '@angular/core';
import { ItemInventory } from '../models/item-inventory';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActionResult } from '../api/models';
import { Store } from '../models/store';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService {

  // API base URL and version
  private rootUrl = environment.apiUrl; 
  private apiVersion = environment.apiVersion;

  constructor(private authService : AuthService, private http: HttpClient) { }

  register(itemInventory: ItemInventory) {
          const url = `${this.rootUrl}/${this.apiVersion}/ItemsStore/AddItem`;
          const authData = this.authService.getAuthDataObject();
          // set parameters
            const params = new HttpParams()
              .set('clientId', authData ? authData.clientId : '')
              .set('sessionId', authData ? authData.sessionId : '')
              .set('itemId', itemInventory.item.itemId ? itemInventory.item.itemId : '')
              .set('storeId', itemInventory.store.storeId ? itemInventory.store.storeId : '')
              .set('operationDate', new Date().toISOString());
    
    
            return this.http.post<ActionResult>(url, null, {
              params,
              responseType: 'json'
            });
        }

        getItems(store: Store) {
          const url = `${this.rootUrl}/${this.apiVersion}/ItemsStore/GetItem`;
          const authData = this.authService.getAuthDataObject();
          // set parameters
            const params = new HttpParams()
              .set('clientId', authData ? authData.clientId : '')
              .set('sessionId', authData ? authData.sessionId : '')
              .set('storeId', store.storeId ? store.storeId : '')
              .set('operationDate', new Date().toISOString());
    
    debugger
            return this.http.post<ActionResult>(url, null, {
              params,
              responseType: 'json'
            });
        }

        // delete item
          delete(itemInventory: ItemInventory) {
              const url = `${this.rootUrl}/${this.apiVersion}/ItemsStore/DeleteItem`;
        
              const authData = this.authService.getAuthDataObject();
              // set parameters
                const params = new HttpParams()
                  .set('clientId', authData ? authData.clientId : '')
                  .set('sessionId', authData ? authData.sessionId : '')
                  .set('storeId', itemInventory.store.storeId ? itemInventory.store.storeId : '')
                  .set('itemId', itemInventory.item.itemId ? itemInventory.item.itemId : '');
            
                return this.http.delete<ActionResult>(url, {
                  params,
                  responseType: 'json'
                });
            }
}
