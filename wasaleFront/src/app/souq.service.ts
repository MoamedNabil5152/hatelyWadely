import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SouqService {

  constructor(private http : HttpClient) { }

  getKitchenData() : Observable<any> {
   let url = 'http://localhost:3000/kitchen'
    return this.http.get<any>(url)
  }

  getdataId(id : any) : Observable<any> {
    let url = 'http://localhost:3000'
    return this.http.get<any>(url + '/kitchen/' + id)
  }

  getTvsData() : Observable<any> {
    let url = 'http://localhost:3000/TVS'
     return this.http.get<any>(url)
   }

   gettvId(id : any) : Observable<any> {
     let url = 'http://localhost:3000'
     return this.http.get<any>(url + '/TVS/' + id)
   }

   getMobileData() : Observable<any> {
    let url = 'http://localhost:3000/mobile'
     return this.http.get<any>(url)
   }

   getMobileId(id : any) : Observable<any> {
     let url = 'http://localhost:3000'
     return this.http.get<any>(url + '/mobile/' + id)
   }

}
