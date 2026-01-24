import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemClient } from '../models/item-client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ActionResult } from '../api/models';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemClientService {

  // API base URL and version
  private rootUrl = environment.apiUrl; 
  private apiVersion = environment.apiVersion;


  constructor(private authService: AuthService, private http: HttpClient) { }

  // register item for client
       register(item: Item) {
        const url = `${this.rootUrl}/${this.apiVersion}/ItemsClient/AddItem`;
      
        const authData = this.authService.getAuthDataObject();
        // set parameters
          const params = new HttpParams()
            .set('clientId', authData ? authData.clientId : '')
            .set('sessionId', authData ? authData.sessionId : '')
            .set('itemId', item.itemId ? item.itemId : '')
            .set('operationDate', new Date().toISOString())
            .set('itemAmount', item.itemAmount?.toString() || '1');
  
  
          return this.http.post<ActionResult>(url, null, {
            params,
            responseType: 'json'
          });
      }

      // get items for client
      getItems() {
        const url = `${this.rootUrl}/${this.apiVersion}/ItemsClient/GetItem`;
      
        const authData = this.authService.getAuthDataObject();
        // set parameters
          const params = new HttpParams()
            .set('clientId', authData ? authData.clientId : '')
            .set('sessionId', authData ? authData.sessionId : '');
  
  
          return this.http.post<ActionResult>(url, null, {
            params,
            responseType: 'json'
          });
      }

      // delete item for client
      delete(item: Item) {
        const url = `${this.rootUrl}/${this.apiVersion}/ItemsClient/DeleteItem`;
      
        const authData = this.authService.getAuthDataObject();
        // set parameters
          const params = new HttpParams()
            .set('clientId', authData ? authData.clientId : '')
            .set('sessionId', authData ? authData.sessionId : '')
            .set('itemId', item.itemId ? item.itemId : '');
  
  
          return this.http.delete<ActionResult>(url, {
            params,
            responseType: 'json'
          });
      }

      sell(){
        const url = `${this.rootUrl}/${this.apiVersion}/ItemsClient/SellItem`;
      
        const authData = this.authService.getAuthDataObject();
        // set parameters
          const params = new HttpParams()
            .set('clientId', authData ? authData.clientId : '')
            .set('sessionId', authData ? authData.sessionId : '');
  
  
          return this.http.put<ActionResult>(url, null,{
            params,
            responseType: 'json'
          });
      }
}
