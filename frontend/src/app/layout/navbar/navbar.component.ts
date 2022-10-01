import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userRole: string = '';
  viewNavbar = true

  constructor(private localtion: Location) {}

  ngOnInit() {
    if(this.localtion.path() == "/user/login" || this.localtion.path() == "/user/register"){
      this.viewNavbar = false
    } else if (this.localtion.path().split('/')[1] === 'admin') {
      this.userRole = 'admin';
    } else {
      this.userRole = 'user';
    }
  }
}
