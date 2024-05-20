import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { Company } from '../../../models/company';
import { CompaniesService } from '../../../services/companies.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css',
  animations: [
    trigger('inputHeight', [
      state('normal', style({
        'font-size': '22px'
      })),
      state('focused', style({
        'font-size': '36px'
      })),
      transition('* => *', [
        animate(300)
      ])
    ]),
    trigger('phoneInput', [
      state('*', style({
        opacity: '1',
        height: 'auto'
      })),
      transition('void=>*', [
        style({
          height: '0px',
          opacity: '0',
        }),
        animate(500, style ({
          height: 'auto',
          opacity: '0',
        })),
        animate(750)
      ]),
      transition('*=>void', [
        animate(750, style ({
          height: 'auto',
          transform: 'translateX(3000px)'
        })),
        animate(500, style ({
          height: '0px',
        })),
      ])
    ]),
    
  ]
})

export class NewContactComponent {
  public contactForm: FormGroup;
  public companies: Company[] = [];

  public inputState = ['normal', 'normal', 'normal', 'normal', 'normal']

  constructor (private contactService: ContactService, private companiesService: CompaniesService){
    this.contactForm = new FormGroup ({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'surname': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'position': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'company': new FormControl(null, [Validators.required]),
      'phones': new FormArray([
        new FormControl(null, [Validators.required, this.validatePhone])
      ]),
    });
    this.companiesService.loadCompanies().subscribe((data)=> {
      this.companies = data;
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
    this.contactService.addContact(this.contactForm.value).subscribe(()=>{});
    this.contactForm.reset();
    this.inputState = ['normal', 'normal', 'normal', 'normal', 'normal'];
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
    this.inputState.push('normal');
  }

  public removePhoneNumber() {
    (this.contactForm.get('phones') as FormArray).removeAt(-1);
    this.inputState.pop();
  }

  public inputFocus(fieldId:number, state:boolean){
    if (state==true){
      this.inputState[fieldId]='focused';
    }else{
      this.inputState[fieldId]='normal';
    }
  }

}
