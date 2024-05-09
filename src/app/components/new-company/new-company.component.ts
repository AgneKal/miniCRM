import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PhoneValidatorDirective } from '../../directives/phone-validator.directive';

@Component({
  selector: 'app-new-company',
  standalone: true,
  imports: [FormsModule, CommonModule, PhoneValidatorDirective],
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.css'
})
export class NewCompanyComponent {

  newCompanySubmit(form: NgForm) {
    console.log(form.invalid);
  }
}
