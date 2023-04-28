import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from 'src/app/models/Departement';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/api-service.service';
import { DepartementService } from 'src/app/services/departement.service';


@Component({
  selector: 'app-popup-edit',
  templateUrl: './popup-edit.component.html',
  styleUrls: ['./popup-edit.component.css']
})
export class PopupEditComponent implements OnInit {

  @Input() visible: boolean;

  @Input() editPerson: Person;

  @Input() title!: any;
  
  @Input() Departement : Departement;
 

  // @Output() newPesonEvent = new EventEmitter<Person>()
  // @Output() editPesonEvent = new EventEmitter<Person>()

  @Output() visibleChange = new EventEmitter()


  constructor(private fb: FormBuilder, private personservice: PersonService, private departementService : DepartementService) {

  }

 

  personForm: FormGroup;
  person: Person;

  departements: Departement[];
  departementSelectionner: Departement;

  ngOnInit(): void {
    console.log(this.editPerson)
    this.personForm = this.fb.group({
      nom: [this.editPerson?.nom, Validators.required],
      prenom: [this.editPerson?.prenom, Validators.required],
      age: [this.editPerson?.age, Validators.required],
      departement: [this.departementSelectionner?.designation, Validators.required]
    });
    this.getAllDepart();
  }


  addOrUpdatePerson() {
    if (this.editPerson.id) {
      this.personservice.updatePerson(this.editPerson.id!, this.editPerson)
        .subscribe({
          next: (res) => {
          },
          error: (e) => console.error(e)
        });
    }
    else {
      this.personservice.addPerson(this.personForm.value).subscribe({
        next: (response) => {
        },
        error: (err) => {
          console.log(err.status);
        }
      })
    }
  }

fermerPopup(){
  this.visibleChange.emit(false);
}

getAllDepart() {
  this.departementService.getAllDepart().subscribe({
    next: (data) => {
      this.departements = data;
    }
  })
}

}

  //============================================================
  