import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from 'src/app/models/Departement';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() visible: boolean;

  @Input() editPerson: Person;

  @Input() title!: any;

  @Input() Departement: Departement;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onRefresh: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, private personservice: PersonService) {}

  personForm: FormGroup;
  departements: Departement[];
  departementSelectionner: Departement;

  ngOnInit(): void {
    this.personForm = this.fb.group({
      id: 0,
      nom: ["", [Validators.required]],
      prenom: ["", [Validators.required]],
      age: ["", [Validators.required]],
      departement: [{}, [Validators.required]],
    });
    this.getAllDepart();
  }



  onOuverture() {
    this.personForm.patchValue({
      id: this.editPerson?.id,
      nom: this.editPerson?.nom,
      prenom: this.editPerson?.prenom,
      age: this.editPerson?.age,
      departement: this.departementSelectionner?.designation
    })
  }



  addOrUpdatePerson() {

    // recuperer les informations de la personne a partir du formulaire
    let personnneModifier = this.personForm.getRawValue()

    if (this.editPerson.id) {
      //modifier une personne existante
      // envoyer au backend les infos du formulaire et non editPerson
      this.personservice.updatePerson(personnneModifier)
        .subscribe({
          next: (res) => {
            console.log("les valeur dans le souscribe", res);
            this.fermerPopup();
          },
          error: (e) => console.error(e)
        });
    }
    else {
      // creation de nouvelle personne
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

  //Pour fermer popup
  fermerPopup() {
    this.visible = false;
  }

  //l'evenement emit vers le tableau lors de la fermeture popup
  onFermeture() {
    this.visibleChange.emit(false);
    this.onRefresh.emit(false)
    
  }

  //recuperer liste departement
  getAllDepart() {
    this.personservice.getAllDepartment().subscribe({
      next: (data) => {
        this.departements = data;
      }
    })
  }
}
