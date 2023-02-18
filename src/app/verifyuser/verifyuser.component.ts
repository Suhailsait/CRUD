import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrls: ['./verifyuser.component.scss']
})
export class VerifyuserComponent implements OnInit {

  id:any;
  email:any

  verifyForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  constructor(private fb: FormBuilder,
    private ds: UserserviceService,
    private router: Router,
    private rout: ActivatedRoute) { 
      
     }

  ngOnInit(): void {
    this.id = this.rout.snapshot.queryParamMap.get('id');
    this.email = this.rout.snapshot.queryParamMap.get('email');
  }

  verify(){
   const otp = this.verifyForm.value
   if (this.verifyForm.valid) {
    this.ds.verify(this.id,otp).subscribe(
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
    alert("Invalid Form")
   }
  
  }

  resend(){    
    this.ds.resendotp(this.email).subscribe(
      (result: any) => {     
        if (result) {
          console.log(result);
          alert(result.message);
        }
      },
      (result) => {
        alert(result.error.message);
        console.log(result.error.message);
      }
    );
  }
}
