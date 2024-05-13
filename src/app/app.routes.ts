import { Routes } from '@angular/router';
import { NewCompanyComponent } from './components/companies/new-company/new-company.component';
import { NewContactComponent } from './components/contacts/new-contact/new-contact.component';
import { CompaniesListComponent } from './components/companies/companies-list/companies-list.component';

export const routes: Routes = [
    {path: 'company/add', component: NewCompanyComponent},
    {path: 'contact/add', component: NewContactComponent},
    {path: 'companies/list', component: CompaniesListComponent}
];
