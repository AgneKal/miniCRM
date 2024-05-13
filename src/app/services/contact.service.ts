import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http: HttpClient) { }

  public addContact(contact: Contact){
    return this.http.post(`https://minicrm-crm-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`, contact)
  }

  public loadContact() {
    return this.http
    .get<{[key:string]: Contact}>(`https://minicrm-crm-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`)
    .pipe (
      map((data): Contact[] => {
        let cont: Contact[] = [];
        for (let c in data){
          cont.push({...data[c], id: c});
        }
        return cont;
      })
    )
  }
  
}
