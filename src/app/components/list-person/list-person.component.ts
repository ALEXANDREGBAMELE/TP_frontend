import { Component, OnChanges, OnInit } from '@angular/core';
import { PersonService } from '../../services/api-service.service'
import { Person } from 'src/app/models/Person';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Departement } from 'src/app/models/Departement';
import { DepartementService } from './../../services/departement.service';
//import { Person } from './../../models/Person';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})

export class ListPersonComponent implements OnInit {

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
    private departementservice: DepartementService
  ) { }

  ngOnInit(): void {
    this.getAllDepart()
    this.getAllPeson()
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


  // ============OUVRIR ET FERMER==========================

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

  //   ouvrirPupop() {
  //     this.person = {};
  //     this.submitted = false;
  //     this.visible = true;

  // }
  // savePerson(){
  //   this.person = {};
  //   this.visible = true;
  // }
  // editerPerson(){
  //   this.person = {... this.person};
  //   this.visible = true;
  // }

  //   fermerDialog() {
  //     this.visible = false;
  //     this.submitted = false;
  // }

  //methode de confirmation de suppression user
  //=====================================================================================


  // confirm1(person: Person) {

  //=================================================



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

//=========== GET DEPARTEMENT ====================

getAllDepart() {
  this.departementservice.getAllDepart().subscribe({
    next: (data) => {
      this.departements = data;
    }
  })
}
}
//=============================================================================
