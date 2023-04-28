import { Departement } from "./Departement";

export class Person{
  id?: number;
  constructor(public nom?: string,
    public prenom?: string,
    public age?: number,
    departement?: Departement){}
}
