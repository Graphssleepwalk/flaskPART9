// flask-backend.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class FlaskBackendService {

  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  async authenticate(username: string, password: string) : Promise<any> {
    const response = await this.http.post<any>('/users/authenticate', { username, password }).toPromise();
    return response;
  }

  register(firstName: string, lastName: string, username: string, password: string): Observable<any> {
    // Your registration logic here, and return an observable
    const user = { firstName, lastName, username, password };
    return this.http.post<any>('/users/register', user);
  }

  async updateUser(id: string, params: any) : Promise<any> {
    const response = await this.http.put<any>(`/users/${id}`, params).toPromise();
    return response;
  }

  async deleteUser(id: string) : Promise<any> {
    const response = await this.http.delete<any>(`/users/${id}`).toPromise();
    return response;
  }

async getUsers() : Promise<any[]> {
  const response = await this.http.get<any[]>('/users').toPromise();
  if (response !== undefined) {
    return response;
  } else {
    return [];
  }
}

  async isLoggedIn() : Promise<boolean> {
    const response = await this.http.get<any>('/users/me').toPromise();
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}

