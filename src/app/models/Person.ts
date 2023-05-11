import { Departement } from "./Departement";

export class Person{
  id?: number;
  constructor(public nom?: string,
    public prenom?: string,
    public age?: number,
    departement?: Departement){}
}

// export interface Person {
//   id?:number;
//   nom?:string;
//   prenom?:string;
//   age?:number;
//   department?:Departement;
// }