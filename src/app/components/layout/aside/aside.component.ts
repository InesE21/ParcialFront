import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  items: MenuItem[]=[];


  ngOnInit(): void {
    this.items = [
      {
        label: 'Persons',
        icon: 'pi pi-fw pi-users',
         items: [
           {
             label: 'Customers',
             icon: 'pi pi-fw pi-user',
             items: [
              {
                label: 'Show Customers',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/persons/customer/show',
              },
              // {
              //   label: 'Create Customers',
              //   icon: 'pi pi-fw pi-plus',
              //   routerLink: '/persons/customer/new',
              // },
              // {
              //   label: 'Update Customers',
              //   icon: 'pi pi-fw pi-pencil',
              //   routerLink: '/persons/customer/edit/:id',
              // },
              // {
              //   label: 'Delete Customers',
              //   icon: 'pi pi-fw pi-trash',
              //   routerLink: '/persons/customer/delete',
              // },
            ]
           },
           {
            label: 'Employees',
            icon: 'pi pi-id-card',
            items: [
              {
                label: 'Show Employees',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/persons/employee/show',
              },
              
            ]
          },
         ]
      },
      {
        label: 'Shipment Management',
        icon: 'pi pi-envelope',
         items: [
           {
             label: 'Correspondences',
             icon: 'pi pi-envelope',
             items: [
              {
                label: 'Show Correspondences',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/shipments/correspondence/show',
              },
              
            ]
           },
           {
            label: 'Shipment Status',
            icon: 'pi pi-info-circle',
            items: [
              {
                label: 'Show Status',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/shipments/shipping/show',
              },
              
            ]
          },
          {
            label: 'Incidents',
            icon: 'pi pi-exclamation-triangle',
            items: [
              {
                label: 'Show Incidents',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/shipments/incident/show',
              },
              
            ]
          },
         ]
      },
      {
        label: 'Logistics',
        icon: 'pi pi-map',
         items: [
           {
             label: 'Routes',
             icon: 'pi pi-directions',
             items: [
              {
                label: 'Show Routes',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/logistics/route/show',
              },
              
            ]
           },
           {
            label: 'Services',
            icon: 'pi pi-cog',
            items: [
              {
                label: 'Show Services',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/logistics/servicel/show',
              },
              
            ]
          },
          {
            label: 'Transports',
            icon: 'pi pi-truck',
            items: [
              {
                label: 'Show Transports',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/logistics/transport/show',
              },
              
            ]
          },
         ]
      },
      {
        label: 'Branches',
        icon: 'pi pi-map-marker',
        items: [
          {
            label: 'Show Branches',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/branch/show',
          },
        ]
      },
    ];
  }
}