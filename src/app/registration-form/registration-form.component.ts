import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  regiForm: FormGroup;

  hide = true;

  constructor(
    private fb: FormBuilder
  ) {
    this.regiForm = fb.group({
      'title': [null, Validators.required],
      'firstName': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      'lastName': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'confirmEmail': [null, Validators.compose([Validators.required, RxwebValidators.compare({ fieldName: 'email' })])],
      'dateOfBirth': [null, Validators.required],
      'phoneNum': [null, Validators.compose([Validators.required, Validators.pattern('[0-9]{11}')])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'), Validators.minLength(8)])]
    })
  }

  ngOnInit(): void {
  }

  firstNameErrorMessage() {
    return this.regiForm.get('firstName').hasError('pattern') ? 'Only letters allowed' : this.regiForm.get('firstName').hasError('required') ? 'This field is required' : '';
  }

  lastNameErrorMessage() {
    return this.regiForm.get('lastName').hasError('pattern') ? 'Only letters allowed' : this.regiForm.get('lastName').hasError('required') ? 'This field is required' : '';
  }

  emailErrorMessage() {
    return this.regiForm.get('email').hasError('email') ? 'E-mail is invalid' : this.regiForm.get('email').hasError('required') ? 'This field is required' : '';
  }

  confirmEmailErrorMessage() {
    return this.regiForm.get('confirmEmail').hasError('compare') ? 'E-mails do not match' : this.regiForm.get('confirmEmail').hasError('required') ? 'This field is required' : '';
  }

  dateOfBirthErrorMessage() {
    return this.regiForm.get('dateOfBirth').hasError('required') ? 'This field is required' : '';
  }

  phoneNumErrorMessage() {
    return this.regiForm.get('phoneNum').hasError('pattern') ? 'Phone number format invalid' : this.regiForm.get('phoneNum').hasError('required') ? 'This field is required' : '';
  }

  passwordErrorMessage() {
    if (this.regiForm.get('password').hasError('pattern')) {
      return 'Password must contain letters and numbers'
    }

    return this.regiForm.get('password').hasError('minlength') ? 'Password must be at least 8 characters long' : this.regiForm.get('password').hasError('required') ? 'This field is required' : '';
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
  }
}
