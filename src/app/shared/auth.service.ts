import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly url="http://localhost:3000/"
  constructor(
    private http:HttpClient
  ) { }
  postAddress(data:any){
    return this.http.post(`${this.url}Address`,data);
  }
}
