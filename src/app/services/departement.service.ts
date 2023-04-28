import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Departement } from '../models/Departement';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class DepartementService{
    constructor(private http: HttpClient) {
    }

    getAllDepart():Observable<Departement[]>{
        return this.http.get<Departement[]>(`${baseUrl}${"/departement/getAll"}`, {headers : this.httpHeader()});
      }

    httpHeader(){
        return new HttpHeaders({
          'content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT, DELETE',
          'Accept':'application/json'
        });
      }
}