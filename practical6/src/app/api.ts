import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://api.jikan.moe/v4/anime'; // API URL

  // Method to fetch data using the fetch API
  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
