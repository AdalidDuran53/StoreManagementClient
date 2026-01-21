import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/api/models/action-result';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })

export class AuthService {
  // API base URL and version
  private rootUrl = environment.apiUrl; 
  private apiVersion = environment.apiVersion;

  constructor(private http: HttpClient) {}

  // login method
  login(userName: string, password: string): Observable<ActionResult> {
    const url = `${this.rootUrl}/${this.apiVersion}/Clients/Login`;

    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password);

    
    return this.http.post<ActionResult>(url, null, {
      params,
      responseType: 'json'
    });
  }

  // register method
  register(user: any) {
  const url = `${this.rootUrl}/${this.apiVersion}/Clients/AddClient`;

  // set parameters
    const params = new HttpParams()
      .set('userName', user.userName)
      .set('password', user.password)
      .set('clientName', user.clientName)
      .set('clientLastName', user.clientLastName)
      .set('clientAddress', user.clientAddress);

    
    return this.http.post<ActionResult>(url, null, {
      params,
      responseType: 'json'
    });
}


  // delete auth data from session storage
  logout(): void { 
    sessionStorage.removeItem('authData');
  }
  
  // check if user is logged in
  isLoggedIn(): boolean { 
    return !!sessionStorage.getItem('authData'); 
  }

  // get authentication data from session storage
  getAuthData() { 
    return sessionStorage.getItem('authData');
  }

  getautehDataObject() {
    const authData = this.getAuthData();
    return authData ? JSON.parse(authData) : null;
  }
}
