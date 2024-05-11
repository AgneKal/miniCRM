import { Routes } from '@angular/router';
import { NewCompanyComponent } from './components/company/new-company/new-company.component';
import { NewContactComponent } from './components/contacts/new-contact/new-contact.component';

export const routes: Routes = [
    {path: 'company/add', component: NewCompanyComponent},
    {path: 'contact/add', component: NewContactComponent}
];
