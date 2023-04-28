import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];

  activeItem: MenuItem;
  ngOnInit() {
      this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home',routerLink:'/home'},
          { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
          { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
          { label: 'Documentation', icon: 'pi pi-fw pi-file' },
          { label: 'Personne', icon: 'pi pi-fw pi-user', routerLink:'/liste' }
      ];

      this.activeItem = this.items[0];

      
  }
}
