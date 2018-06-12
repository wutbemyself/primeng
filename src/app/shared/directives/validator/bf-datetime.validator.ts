import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, AbstractControl, ValidatorFn, Validator } from '@angular/forms';


// validation function
function validateBfDateTimeFactory() : ValidatorFn {
  return (c: AbstractControl) => {

    var myRegExp=/^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01]) ([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/;   //regex yyyy-mm-dd hh:MM:ss
    
    var d = c.value + '';
    
    if(d==null||d=='undefined'||d==''||d.match(myRegExp)) {
      return null;
    } else {
      return {
        bfDateTime: {
          valid: false
        }
      };
    }

  }
}


@Directive({
  selector: '[bfDateTime][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: BfDateTimeValidator, multi: true }
  ]
})
export class BfDateTimeValidator implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateBfDateTimeFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}