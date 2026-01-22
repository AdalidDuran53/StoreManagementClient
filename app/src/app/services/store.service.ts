import { Injectable } from '@angular/core';
import { Store } from '../models/store';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActionResult } from '../api/models';
import { AuthService } from './auth.service';
@Injectable({ providedIn: 'root' })

export class StoreService {
  // API base URL and version
  private rootUrl = environment.apiUrl; 
  private apiVersion = environment.apiVersion;
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  // register new store
    register(store: Store) {
    const url = `${this.rootUrl}/${this.apiVersion}/Stores/AddStore`;
  
    const authData = this.authService.getAuthDataObject();
    // set parameters
      const params = new HttpParams()
        .set('clientId', authData ? authData.clientId : '')
        .set('sessionId', authData ? authData.sessionId : '')
        .set('storeBranch', store.storeBranch)
        .set('storeAddress', store.storeAddress)
  
      
      return this.http.post<ActionResult>(url, null, {
        params,
        responseType: 'json'
      });
  }

  getStores() {
    const url = `${this.rootUrl}/${this.apiVersion}/Stores/GetStore`;
  
    const authData = this.authService.getAuthDataObject();
    // set parameters
      const params = new HttpParams()
        .set('clientId', authData ? authData.clientId : '')
        .set('sessionId', authData ? authData.sessionId : '')
  
      
      return this.http.get<ActionResult>(url, {params,
        responseType: 'json'});
  }

  update(store: Store) {
    const url = `${this.rootUrl}/${this.apiVersion}/Stores/UpdateStore`;
  
    const authData = this.authService.getAuthDataObject();
    // set parameters
      const params = new HttpParams()
        .set('clientId', authData ? authData.clientId : '')
        .set('sessionId', authData ? authData.sessionId : '')
        .set('storeId', store.storeId ? store.storeId : '')
        .set('newStoreBranch', store.storeBranch)
        .set('newStoreAddress', store.storeAddress);
  
      return this.http.put<ActionResult>(url, null, {
        params,
        responseType: 'json'
      });
  }

  delete(store: Store) {
    const url = `${this.rootUrl}/${this.apiVersion}/Stores/DeleteStore`;

    const authData = this.authService.getAuthDataObject();
    // set parameters
      const params = new HttpParams()
        .set('clientId', authData ? authData.clientId : '')
        .set('sessionId', authData ? authData.sessionId : '')
        .set('storeId', store.storeId ? store.storeId : '');
  
      return this.http.delete<ActionResult>(url, {
        params,
        responseType: 'json'
      });
  }
}
