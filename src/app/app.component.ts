import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title : string = "frontend";
  items: MenuItem[];

  activeItem: MenuItem;
  ngOnInit() {
      this.items = [
          { label: 'Accueil', icon: 'pi pi-fw pi-home',routerLink:'/home'},
          { label: 'Calendrier', icon: 'pi pi-fw pi-calendar' },
          { label: 'Modifier', icon: 'pi pi-fw pi-pencil' },
          { label: 'Documentation', icon: 'pi pi-fw pi-file' },
          { label: 'Personnes', icon: 'pi pi-fw pi-user', routerLink:'/liste' }
      ];

      this.activeItem = this.items[0];

      
  }
}
