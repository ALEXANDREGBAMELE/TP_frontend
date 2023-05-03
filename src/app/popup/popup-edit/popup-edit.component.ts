import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

  @Input() Departement: Departement;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, private personservice: PersonService, private departementService: DepartementService) {

  }

  personForm: FormGroup;
  person: Person;

  departements: Departement[];
  departementSelectionner: Departement;


  ngOnInit(): void {
    this.personForm = this.fb.group({
      nom: [this.editPerson?.nom, Validators.required, Validators.minLength(2)],
      prenom: [this.editPerson?.prenom, Validators.required, Validators.minLength(2)],
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
            this.fermerPopup();
          },
          error: (e) => console.error(e)
        });
    }
    else {
      this.personservice.addPerson(this.personForm.value).subscribe({
        next: (response) => {
          this.fermerPopup();
        },
        error: (err) => {
          console.log(err.status);
        }
      });
    }
  }

  fermerPopup() {
    this.visible = false;
  }

  onFermeture() {
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
