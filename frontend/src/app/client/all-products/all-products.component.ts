import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Products } from 'src/models/Products';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  productList: Products[] = []

  constructor(private apiCall: ApiService) { }

  ngOnInit() {
    this.apiCall.getProductList().subscribe((data) => {
      data.map((each:any) => {
        each["clicked"] = false
        this.productList.push(each)
      })
    });
  }

  addToCart(selectedProduct: any){
    console.log(selectedProduct);
    this.productList.map((each: any) => {
      if(each.id === selectedProduct.id){
        each.clicked = true
      }
    })

    let cart: any = localStorage.getItem("cartdetails")
    cart = JSON.parse(cart)

    cart.push(selectedProduct)

    localStorage.setItem("cartdetails", JSON.stringify(cart))
  }
}
