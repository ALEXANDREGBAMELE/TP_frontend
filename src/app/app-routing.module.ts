import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { ListPersonComponent } from './components/list-person/list-person.component';
import { PopupEditComponent } from './popup/popup-edit/popup-edit.component';
// import{ListPersonComponent} from './components/list-person/list-person.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
 { path: 'liste', component: ListPersonComponent },
  {path: 'edit', component:PopupEditComponent},
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
