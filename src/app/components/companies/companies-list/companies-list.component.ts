import { Component } from '@angular/core';
import { Company } from '../../../models/company';
import { Contact } from '../../../models/contact';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { CompaniesService } from '../../../services/companies.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css'
})
export class CompaniesListComponent {
  public companies: Company[]=[];
  public contacts: Contact[]=[];

  constructor (private companiesService: CompaniesService){
    this.companiesService.loadCompanies().subscribe((data)=>{
        this.companies=data;
    })
  }
}
