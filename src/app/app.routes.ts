import { Routes } from '@angular/router';

import { ShowCustomerComponent } from './components/persons/customer/show-customer/show-customer.component';
import { CreateCustomerComponent } from './components/persons/customer/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/persons/customer/update-customer/update-customer.component';
import { ShowEmployeeComponent } from './components/persons/employee/show-employee/show-employee.component';
import { CreateEmployeeComponent } from './components/persons/employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/persons/employee/update-employee/update-employee.component';

import { ShowCorrespondenceComponent } from './components/shipments/correspondence/show-correspondence/show-correspondence.component';
import { CreateCorrespondenceComponent } from './components/shipments/correspondence/create-correspondence/create-correspondence.component';
import { UpdateCorrespondenceComponent } from './components/shipments/correspondence/update-correspondence/update-correspondence.component';
import { ShowIncidentComponent } from './components/shipments/incident/show-incident/show-incident.component';
import { CreateIncidentComponent } from './components/shipments/incident/create-incident/create-incident.component';
import { UpdateIncidentComponent } from './components/shipments/incident/update-incident/update-incident.component';
import { ShowShippingComponent } from './components/shipments/shipping/show-shipping/show-shipping.component';
import { CreateShippingComponent } from './components/shipments/shipping/create-shipping/create-shipping.component';
import { UpdateShippingComponent } from './components/shipments/shipping/update-shipping/update-shipping.component';


import { UpdateRouteComponent } from './components/logistics/route/update-route/update-route.component';
import { CreateRouteComponent } from './components/logistics/route/create-route/create-route.component';
import { ShowRouteComponent } from './components/logistics/route/show-route/show-route.component';
import { ShowServiceComponent } from './components/logistics/servicel/show-service/show-service.component';
import { UpdateServiceComponent } from './components/logistics/servicel/update-service/update-service.component';
import { CreateServiceComponent } from './components/logistics/servicel/create-service/create-service.component';
import { UpdateTransportComponent } from './components/logistics/transport/update-transport/update-transport.component';
import { CreateTransportComponent } from './components/logistics/transport/create-transport/create-transport.component';
import { ShowTransportComponent } from './components/logistics/transport/show-transport/show-transport.component'

import { ShowBranchComponent } from './components/branch/show-branch/show-branch.component';
import { CreateBranchComponent } from './components/branch/create-branch/create-branch.component';
import { UpdateBranchComponent } from './components/branch/update-branch/update-branch.component';

import { ContentComponent } from './components/layout/content/content.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'content', 
        pathMatch: 'full' 
    },

    { path: 'content', component: ContentComponent },

    //Routes for Persons
    { path: "persons/customer/show", component: ShowCustomerComponent },
    { path: "persons/customer/new", component: CreateCustomerComponent },
    { path: "persons/customer/edit/:id", component: UpdateCustomerComponent },

    { path: "persons/employee/show", component: ShowEmployeeComponent },
    { path: "persons/employee/new", component: CreateEmployeeComponent },
    { path: "persons/employee/edit/:id", component: UpdateEmployeeComponent },

    
    //Routes for Shipping
    { path: "shipments/correspondence/show", component: ShowCorrespondenceComponent },
    { path: "shipments/correspondence/new", component: CreateCorrespondenceComponent },
    { path: "shipments/correspondence/edit/:id", component: UpdateCorrespondenceComponent },

    { path: "shipments/incident/show", component: ShowIncidentComponent },
    { path: "shipments/incident/new", component: CreateIncidentComponent },
    { path: "shipments/incident/edit/:id", component: UpdateIncidentComponent },

    { path: "shipments/shipping/show", component: ShowShippingComponent },
    { path: "shipments/shipping/new", component: CreateShippingComponent },
    { path: "shipments/shipping/edit/:id", component: UpdateShippingComponent },

    //Routes for Logistics
    {path: "logistics/route/show", component: ShowRouteComponent},
    {path: "logistics/route/new", component: CreateRouteComponent},
    {path: "logistics/route/edit/:id", component: UpdateRouteComponent},

    {path: "logistics/servicel/show", component: ShowServiceComponent},
    {path: "logistics/servicel/new", component: CreateServiceComponent},
    {path: "logistics/servicel/edit/:id", component: UpdateServiceComponent},

    {path: "logistics/transport/show", component: ShowTransportComponent},
    {path: "logistics/transport/new", component: CreateTransportComponent},
    {path: "logistics/transport/edit/:id", component: UpdateTransportComponent},


    //Routes for Branch
    { path: "branch/show", component: ShowBranchComponent },
    { path: "branch/new", component: CreateBranchComponent },
    { path: "branches/edit/:id", component: UpdateBranchComponent }


]