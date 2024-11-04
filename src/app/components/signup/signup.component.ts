import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { sign } from 'crypto';
import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
// import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  type: string = 'Password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          if (res && res.message) {
            alert(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
          } else {
            console.error('Unexpected response:', res);
            alert('An unexpected error occurred');
          }
        },
        error: (err) => {
          if (err && err.error && err.error.message) {
            alert(err.error.message);
          } else {
            console.error('Error occurred:', err);
            alert('An error occurred during signup');
          }
        },
      });
    } else {
      console.log("SignUp form invalid");
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Invalid");
    }
  }



}
