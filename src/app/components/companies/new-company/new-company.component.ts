import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PhoneValidatorDirective } from '../../../directives/phone-validator.directive';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'app-new-company',
  standalone: true,
  imports: [FormsModule, CommonModule, PhoneValidatorDirective, ReactiveFormsModule],
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.css'
})

export class NewCompanyComponent {
  public companyForm: FormGroup;

  constructor (private companiesService: CompaniesService) {
    this.companyForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'companyCode': new FormControl(null, [Validators.required, this.validateCompanyCode]),
      'VATcode': new FormControl(null, [Validators.required, this.validateVATCode]),
      'address': new FormControl(null, [Validators.required, this.validateAddress]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, this.validatePhoneNumber])
    })
  }

  validateCompanyCode(control: FormControl): ValidationErrors | null {
    const companyCode: string = control.value;
    const pattern = /^[0-9]{7,9}$/;
      if (pattern.test(companyCode)){
        return null;
      } else {
        return {error: 'Klaida'};
      }
  }

  validateVATCode(control: FormControl): ValidationErrors | null {
    const VATcode: string = control.value;
    const pattern = /(^LT[0-9]{9,12}$)|(^[0-9]{9,12}$)/;
      if (pattern.test(VATcode)){
        return null;
      } else {
        return {error: 'Klaida'};
      }
  }

  validateAddress(control: FormControl): ValidationErrors | null {
    const address: string = control.value;
    const pattern = /[Ą-Ž\w\-\.\, ]*$/;
      if (pattern.test(address)){
        return null;
      } else {
        return {error: 'Klaida'};
      }
  }

  validatePhoneNumber(control: FormControl): ValidationErrors | null {
    const phoneNumber: string = control.value;
    const pattern = /^\+370[0-9]{8}$/;

    if (pattern.test(phoneNumber)){
      return null;
    } else {
      return {error: 'Klaida'};
    }
  }

  onSubmit() {
    this.companiesService.addCompany(this.companyForm.value).subscribe(()=>{});
    this.companyForm.reset();
  }


}
