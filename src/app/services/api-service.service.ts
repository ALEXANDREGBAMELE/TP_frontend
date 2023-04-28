import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../models/Person';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
 
  
  constructor(private http: HttpClient) {
   }

  //methodes afficher data
  showPerson():Observable<Person[]>{
    return this.http.get<Person[]>(`${baseUrl}${"/personne/getAll"}`, {headers : this.httpHeader()});
  }

  //methodes ajouter user
  addPerson(person : Person){
    return this.http.post<Person>(`${baseUrl}${"/personne/add"}`, person, {headers: this.httpHeader()})
  }

   //methodes mise a jour user
  updatePerson(id: number, person: Person): Observable<any> {
    return this.http.put(`${baseUrl}${"/personne/update"}${'/id'}`, person, {headers: this.httpHeader()});
  }

   //methodes supprimer user
  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}${"/personne/delete/"}${id}`, {headers: this.httpHeader()});
  }
  //=================================================================================
  //methodes pour faire un get selon Id
    get(id: number): Observable<Person> {
      return this.http.get<Person>(`${baseUrl}${"/personne/getById"}${'/id'}`);
    }



    //Departeement service

    // deleteAll(): Observable<any> {
    //   return this.http.delete(baseUrl);
    // }

    // findByTitle(title: any): Observable<Person[]> {
    //   return this.http.get<Person[]>(`${baseUrl}?title=${title}`);
    // }
//======================================================================================
  httpHeader(){
    return new HttpHeaders({
      'content-Type':'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT, DELETE',
      'Accept':'application/json'
    });
  }
}

//===========================================================================================================
