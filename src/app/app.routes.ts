import { Routes } from '@angular/router';
import { NewCompanyComponent } from './components/companies/new-company/new-company.component';
import { NewContactComponent } from './components/contacts/new-contact/new-contact.component';
import { CompaniesListComponent } from './components/companies/companies-list/companies-list.component';
import { ContactsListComponent } from './components/contacts/contacts-list/contacts-list.component';

export const routes: Routes = [
    {path: 'companies/add', component: NewCompanyComponent},
    {path: 'contacts/add', component: NewContactComponent},
    {path: 'companies/list', component: CompaniesListComponent},
    {path: 'contacts/list', component: ContactsListComponent}
];
