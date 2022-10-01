import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameField: string = ""
  passwordField: string = ""

  constructor(private apiCall: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  checkAuthentication(){
    const payload = {
      username: this.usernameField,
      password: this.passwordField
    }
    this.apiCall.loginAccount(payload).subscribe((data: any) => {
      if(data.flag === 'SUCCESS'){
        localStorage.setItem("authstatus", this.usernameField)

        if(data.user.role === 'admin'){ 
          this.router.navigate(['admin/orders'])
        } else if(data.user.role === 'user'){
          this.router.navigate(['user/checkout'])
        }
      }
    })
  }
}
