import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {

  forgotForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$]*'),
        Validators.email,
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private ds: UserserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  forgot(){
    const email = this.forgotForm.value

    if (this.forgotForm.valid) {
      this.ds.forgot(email)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            this.router.navigateByUrl('')
          }
        },
        result => {
          alert(result.error.message)
        }
      )
    } else {
      alert("Invalid Email")
    }
  }
}
