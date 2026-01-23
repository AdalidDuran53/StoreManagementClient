import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Item } from '../models/item';
import { environment } from 'src/environments/environment';
import { ActionResult } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // API base URL and version
  private rootUrl = environment.apiUrl; 
  private apiVersion = environment.apiVersion;

  constructor(private authService: AuthService, private http: HttpClient) { }
  
  // register new item
      register(item: Item) {
      const url = `${this.rootUrl}/${this.apiVersion}/Items/AddItem`;
    
      const authData = this.authService.getAuthDataObject();
      // set parameters
        const params = new HttpParams()
          .set('clientId', authData ? authData.clientId : '')
          .set('sessionId', authData ? authData.sessionId : '')
          .set('itemCode', item.itemCode)
          .set('itemDescription', item.itemDescription)
          .set('itemPrice', item.itemPrice.toString())
          .set('itemStock', item.itemStock.toString());

          // create form data for file upload
          const formData = new FormData();
          formData.append('itemImg', item.itemImg);

        return this.http.post<ActionResult>(url, formData, {
          params,
          responseType: 'json'
        });
    }

    // update existing item
    update(item: Item) {
      const url = `${this.rootUrl}/${this.apiVersion}/Items/UpdateItem`;
    
      const authData = this.authService.getAuthDataObject();
      // set parameters
        const params = new HttpParams()
          .set('clientId', authData ? authData.clientId : '')
          .set('sessionId', authData ? authData.sessionId : '')
          .set('itemId', item.itemId ? item.itemId : '')
          .set('itemCode', item.itemCode)
          .set('itemDescription', item.itemDescription)
          .set('itemPrice', item.itemPrice.toString())
          .set('itemStock', item.itemStock.toString());

          // create FormData for file upload
          const formData = new FormData();
          formData.append('itemImg', item.itemImg);

        return this.http.put<ActionResult>(url, formData, {
          params,
          responseType: 'json'
        });
    }

    // get items
  getItems() {
    const url = `${this.rootUrl}/${this.apiVersion}/Items/GetItem`;
  
    const authData = this.authService.getAuthDataObject();
    // set parameters
      const params = new HttpParams()
        .set('clientId', authData ? authData.clientId : '')
        .set('sessionId', authData ? authData.sessionId : '')
  
      
      return this.http.get<ActionResult>(url, {params,
        responseType: 'json'});
  }

  // delete item
  delete(item: Item) {
      const url = `${this.rootUrl}/${this.apiVersion}/Items/DeleteItem`;

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
}
