import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$]*'),
        Validators.email,
      ],
    ],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  constructor(private fb: FormBuilder,
    private ds: UserserviceService,
    private router: Router) {}

  ngOnInit(): void {}

  login() {

    const { email,password } = this.loginForm.value;
    if (this.loginForm.valid) {
      //asynchronous
      this.ds.login(email, password)
        .subscribe((result: any) => {
          if (result) {
            // localStorage.setItem('currentUser', result.currentUser)
            // localStorage.setItem('currentUid', result.currentUid)
            // localStorage.setItem('token', result.token)

            alert(result.message)
            this.router.navigateByUrl('dashboard')
          }
        },
          result => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert("Invalid form")
    }
    
}
}
