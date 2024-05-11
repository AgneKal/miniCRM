import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})

export class NewContactComponent {
  public contactForm: FormGroup;

  constructor (private contactService: ContactService){
    this.contactForm = new FormGroup ({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'surname': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'position': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'company': new FormControl(null),
      'phones': new FormArray([
        new FormControl(null, [Validators.required, this.validatePhone])
      ]),
    })
  }

validatePhone(control: FormControl): ValidationErrors | null {
    const phoneNumber: string = control.value;
    const pattern = /^\+370[0-9]{8}$/;

    if (pattern.test(phoneNumber)){
      return null;
    } else {
      return {error: 'Klaida'};
    }
  }

  onSubmit() {
    console.log(this.contactForm);
    this.contactService.addContact(this.contactForm.value).subscribe(()=>{});
    this.contactForm.reset();
    (this.contactForm.get('phones') as FormArray).controls = [
      new FormControl(null, Validators.required)
    ]
  }

  get phones() {
    return (this.contactForm.get('phones') as FormArray).controls;
  }

  public addPhoneNumber(){
    const number = new FormControl(null, [Validators.required, this.validatePhone]);
    (this.contactForm.get('phones') as FormArray).push(number);
  }

  public removePhoneNumber() {
    (this.contactForm.get('phones') as FormArray).removeAt(-1)
  }
}
