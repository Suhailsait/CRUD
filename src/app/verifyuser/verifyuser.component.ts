import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrls: ['./verifyuser.component.scss']
})
export class VerifyuserComponent implements OnInit {

  token:any;


  constructor(private ds: UserserviceService,
    private router: Router,
    private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.rout.snapshot.queryParamMap.get('useToken');
  }

  verify(){
    this.ds.verify(this.token).subscribe(
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
  }

}
