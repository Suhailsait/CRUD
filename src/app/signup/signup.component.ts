import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private ds: UserserviceService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$]*'),
          Validators.email,
        ]),
        phoneno: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]*'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]*'),
        ]),
        confirmpassword: new FormControl('', [Validators.required]),
      },
      { validators: this.MustMatch('password', 'confirmpassword') }
    );
  }

  ngOnInit(): void {}

  MustMatch(password: any, confirmpassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmpasswordControl = formGroup.controls[confirmpassword];

      if (
        confirmpasswordControl.errors &&
        !confirmpasswordControl.errors['mismatch']
      ) {
        return;
      }

      passwordControl.value !== confirmpasswordControl.value
        ? confirmpasswordControl.setErrors({ mismatch: true })
        : confirmpasswordControl.setErrors(null);
    };
  }

  signup() {
    const { username, email, phoneno, password } = this.signupForm.value;
    if (this.signupForm.valid) {
      this.ds.signup(username, email, phoneno, password).subscribe(
        (result: any) => {          
          if (result) {
            alert(result.message);
            console.log(result);
            
            this.router.navigate(['/verify'],{queryParams:{id:result.data._id,email:result.data.email}});
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
    } else {
      alert('Invalid Form');
    }
  }
}
