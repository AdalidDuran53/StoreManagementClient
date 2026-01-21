import { Observable } from 'rxjs';
import { Component, Injectable } from '@angular/core';
import { ActionResult } from 'src/app/api/models/action-result';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service'; 
import { Item } from '../models/item';

@Injectable({ providedIn: 'root' })

export class ItemsService {
// API base URL and version
  private rootUrl = environment.apiUrl; 
  private apiVersion = environment.apiVersion;

  constructor(private http: HttpClient, private authService: AuthService) { }

   // login method
    getItems(): Observable<ActionResult> {
      debugger
      const url = `${this.rootUrl}/${this.apiVersion}/Items/GetItem`;
      const authData = this.authService.getautehDataObject();
      const params = new HttpParams()
        .set('clientId', authData.clientId || '')
        .set('sessionId', authData.sessionId || '')
      
      return this.http.get<ActionResult>(url, {params});
    }

    addItem(item: Item): Observable<ActionResult> {
      debugger;
      const url = `${this.rootUrl}/${this.apiVersion}/Items/AddItem`;
      const authData = this.authService.getautehDataObject();
      console.log(authData);
      
      const params = new HttpParams()
        .set('clientId', authData.clientId || '')
        .set('sessionId', authData.sessionId || '')
        .set('itemCode', item.itemCode)
        .set('itemDescription', item.itemDescription)
        .set('itemPrice', item.itemPrice.toString())
        .set('itemStock', item.itemStock.toString())
        .set('itemfile', item.itemfile ? item.itemfile.name : '');

        const formData = new FormData(); 
        formData.append('itemCode', item.itemCode);
        formData.append('itemDescription', item.itemDescription);
        formData.append('itemPrice', item.itemPrice.toString());
        formData.append('itemStock', item.itemStock.toString());
        formData.append('clientId', authData.clientId || '');
        formData.append('sessionId', authData.sessionId || '');
        formData.append('itemImg', item.itemfile);
      
      return this.http.post<ActionResult>(url, formData);
    }
}
