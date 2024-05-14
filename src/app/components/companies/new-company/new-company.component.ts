import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
      'email': new FormControl(null, {validators:[Validators.required, this.validateEmail], asyncValidators:[CompaniesService.createUniqueCompanyEmailValidator(companiesService)]}),
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

  validateEmail(control: FormControl): ValidationErrors | null {
    const email: string = control.value;
    const pattern = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
      if (pattern.test(email)){
        return null;
      } else {
        return {error: 'El. pašto adresas neatitinka el. pašto adreso formato'};
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
