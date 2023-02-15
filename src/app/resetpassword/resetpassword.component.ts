import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private ds: UserserviceService,
    private router: Router,
    private rout: ActivatedRoute
  ) {
    this.resetForm = this.fb.group(
      {
        token:this.rout.snapshot.queryParamMap.get('useToken'),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]*'),
        ]),
        confirmpassword: new FormControl('', [Validators.required]),
      },
      { validators: this.MustMatch('password', 'confirmpassword') }
    );
  }

  ngOnInit(): void {    
  }
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

  reset() {
    console.log(this.resetForm.value)
    const token = this.resetForm.value;
    const password = this.resetForm.value;
    if (this.resetForm.valid) {
      this.ds.reset(token, password).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
            this.router.navigateByUrl('');
          }
        },
        (result) => {
          alert(result.error.message);
          console.log(result.error.message);
          
        }
      );
    } else {
      alert('Invalid Password');

    }
  }
}
