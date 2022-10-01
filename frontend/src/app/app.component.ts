import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'learning';
  userRole: string = '';

  constructor(private localtion: Location) {}

  ngOnInit() {
    if (this.localtion.path().split('/')[1] === 'admin') {
      this.userRole = 'admin';
    } else {
      this.userRole = 'user';
    }
  }
}
