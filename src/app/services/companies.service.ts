import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompaniesService {

  constructor(private http: HttpClient) { }

  public addCompany (company: Company) {
    return this.http.post(`https://minicrm-crm-default-rtdb.europe-west1.firebasedatabase.app/companies.json`, company)
  }

  public loadCompanies() {
    return this.http
      .get<{[key: string]: Company}>(`https://minicrm-crm-default-rtdb.europe-west1.firebasedatabase.app/companies.json`)
      .pipe (
        map((data): Company[] => {
          let comp: Company[] = [];
          for (let c in data) {
            comp.push({...data[c], id: c});
          }
          return comp;
        })
      )
  }

}
