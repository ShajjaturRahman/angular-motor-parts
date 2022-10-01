import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  viewHeader = true

  constructor(private location: Location) { }

  ngOnInit(): void {
    if(this.location.path() == "/user/login" || this.location.path() == "/user/register"){
      this.viewHeader = false
    }
  }

}
