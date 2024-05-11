import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http: HttpClient) { }

  public addContact(contact: Contact){
    return this.http.post(`https://minicrm-crm-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`, contact)
  }
}
