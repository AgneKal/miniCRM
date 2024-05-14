import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Company } from '../../../models/company';
import { map } from 'rxjs';
import { Contact } from '../../../models/contact';
import { CompaniesService } from '../../../services/companies.service';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.css'
})
export class ContactsListComponent {
  public companies: Company[]=[];
  public contacts: Contact[]=[];

  constructor(private contactService: ContactService, private companiesService: CompaniesService){
    this.companiesService
      .loadCompanies()
      .subscribe((data)=>{
        this.companies=data;
          this.contactService
          .loadContact()
          .pipe(
            map((data)=>{
              data.forEach((contact, contactId)=>{
                this.companies.forEach((company, companyId)=>{
                  if (contact.company === company.id){
                    data[contactId].company_name = company;
                  }
                })
              });
              return data;
            }
          ))
          .subscribe((data)=>{
            this.contacts=data;
          });
        });
  }
}
