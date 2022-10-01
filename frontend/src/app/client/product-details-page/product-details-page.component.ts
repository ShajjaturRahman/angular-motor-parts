import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {
  id = 0
  url = ""
  product: any = ""

  constructor(private location: Location, private apiCall: ApiService) { }

  ngOnInit(): void {
    this.url = this.location.path()
    this.id = parseInt(this.url.split("/")[3])

    this.apiCall.getProductById(this.id).subscribe(data => {
      this.product = data[0]
    })
  }
}
