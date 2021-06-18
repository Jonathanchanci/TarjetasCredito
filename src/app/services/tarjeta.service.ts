import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarjeta } from '../Interfaces/tarjeta.interface';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myAppUrl = 'http://localhost:46504/';
  private myApiUrl = 'api/tarjeta/';
  constructor(private  http: HttpClient) { }

  getlistTarjetas() : Observable<Tarjeta[]>{
    return this.http.get<Tarjeta[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteTarjeta(id: number) : Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveTarjeta(tarjeta : Tarjeta): Observable<Tarjeta>{
    return this.http.post<Tarjeta>(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  updateTarjeta(id: number, tarjeta : Tarjeta): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
}
