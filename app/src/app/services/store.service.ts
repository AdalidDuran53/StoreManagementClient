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
}
