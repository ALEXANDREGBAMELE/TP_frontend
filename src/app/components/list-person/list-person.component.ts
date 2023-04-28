import { Component, OnChanges, OnInit } from '@angular/core';
import { PersonService } from '../../services/api-service.service'
import { Person } from 'src/app/models/Person';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Departement } from 'src/app/models/Departement';
import { DepartementService } from './../../services/departement.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})

export class ListPersonComponent implements OnInit {

  persons: Person[];
  person!: Person;
  visible : boolean;
  departements: Departement[];

  // submitted : boolean;

  currentPerson?: Person; // variable de type prsonne declarer pour inttervenir au niveau de la suppression
  currentIndex = -1;
  title: string;


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

  ouvrirPopupCreationOuModification(editperson ? : Person) {
    if (editperson) {
      this.person = editperson;
      this.visible = true;
      this.title = "modifier Un Utilisateur Existant"
    }
    else {
      this.person = new Person();
      this.visible = true;
      this.title = "Creer Un Nouveau Utilisateur"
    }
  }
  // ============OUVRIR ET FERMER==========================
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
 
 
confirm1(person: Person) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deletePerson(person.id!)
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
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
