import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPhoneValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PhoneValidatorDirective,
      multi:true
    }
  ],
  standalone: true
})

export class PhoneValidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const phoneNumber: string = control.value;
    
    if (phoneNumber !== null) {
      if (phoneNumber.length < 10) {
        return {error: "Tel. Nr. turi būti netrumpesnis kaip 10 simbolių"};
      } else if (phoneNumber.length > 12) {
        return {error: "Tel. Nr. turi būti neilgesnis kaip 12 simbolių"};
      } else if (phoneNumber[0] !== "+") {
        return {error: "Tel. Nr. turi prasidėti +"};
      } else {
        return null;
      }
    } else {
      return null;
    }
  }


}
