import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  viewFooter = true

  constructor(private location: Location) { }

  ngOnInit(): void {
    if(this.location.path() == "/user/login" || this.location.path() == "/user/register"){
      this.viewFooter = false
    }
  }

}
