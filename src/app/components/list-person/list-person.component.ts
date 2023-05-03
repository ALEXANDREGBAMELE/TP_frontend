import { Component, OnChanges, OnInit } from '@angular/core';
import { PersonService } from '../../services/api-service.service'
import { Person } from 'src/app/models/Person';
import { ConfirmEventType, ConfirmationService, FilterMatchMode, MessageService, PrimeNGConfig } from 'primeng/api';
import { Departement } from 'src/app/models/Departement';
import { DepartementService } from './../../services/departement.service';
import { PrimeIcons} from 'primeng/api';
//import { Person } from './../../models/Person';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})

export class ListPersonComponent implements OnInit {
  [x: string]: any;

  persons: Person[];
  person!: Person;
  visible: boolean;
  departements: Departement[];

  // submitted : boolean;

  currentPerson?: Person; // variable de type prsonne declarer pour inttervenir au niveau de la suppression
  currentIndex = -1;
  title: string;

  recevoirClick(etat : boolean) :void{
    this.visible = !etat;
  }


  constructor(private personService: PersonService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private departementservice: DepartementService,
    private primeConfig : PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.getAllDepart()
    this.getAllPeson()

    this.primeConfig.filterMatchModeOptions = {text: [], numeric: [
      FilterMatchMode.LESS_THAN,
      FilterMatchMode.GREATER_THAN,
      FilterMatchMode.EQUALS,
      FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
      FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ], date: []};
  }

  getAllPeson() {
    this.personService.showPerson().subscribe({
      next: data => {
        this.persons = data;
      },
      error: err => {
        console.log(err);
      },
    })
    this.getAllDepart()
  }

  refreshList(): void {
    this.getAllPeson();
    this.currentPerson = {};
    this.currentIndex = -1;
  }

  setActivePerson(person: Person, index: number): void {
    this.currentPerson = person;
    this.currentIndex = index;
  }

  deletePerson(id: number): void {
    this.personService.deletePerson(id)
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }


  /* 
  * Methode ouvrir la pop-pup 
  * Modifier ou creer un nouvel utilisateur
  * @Param
  */

  

  ouvrirPopupCreationOuModification(editperson?: Person) {
    if (editperson) {
      this.person = editperson;
      this.title = "MODIFIER"
    }
    else {
      this.person = new Person();
      this.title = "AJOUTER"
    }
    this.visible = true;
  }

  confirm1(person: Person) {
    this.confirmationService.confirm({
    message: 'Voulez vous supprimer  $({person.nom}',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePerson(person.id!)
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: (type : any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            this.refreshList();
            break
        }
      }
    });
  }

 /* 
  * @GET DEPARTEMENT WITHOUT PARAM 
  */

getAllDepart() {
  this.departementservice.getAllDepart().subscribe({
    next: (data) => {
      this.departements = data;
    }
  })
}
}
