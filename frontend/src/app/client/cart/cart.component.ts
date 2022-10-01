import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/models/Products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  orderList: Products[] = [];
  loggedIn: boolean = false;
  totalAmount: number = 0
  productList: any = []

  constructor(private router: Router) {}

  ngOnInit(): void {
    let items: any = localStorage.getItem('cartdetails');
    items = JSON.parse(items);
    this.orderList = items;
    this.totalAmount = items.reduce((acc: any, next: any) => acc + next.price, 0)

    let loginStatus: any = localStorage.getItem('authstatus');

    if (
      loginStatus === null ||
      loginStatus === undefined ||
      loginStatus === ''
    ) {
      this.loggedIn = false
    } else {
      this.loggedIn = true
    }
  }

  removeFromCart(removedProductId: any){
    this.orderList = this.orderList.filter(each => each.id !== removedProductId)
    localStorage.setItem("cartdetails", JSON.stringify(this.orderList))

    this.totalAmount = 0
    this.orderList.forEach((each: any)  => {
      this.totalAmount = this.totalAmount + each.price
    });

    let products: any = localStorage.getItem("products")
    products = JSON.parse(products)

    this.productList = products.map((each: any) => {
      if(each.id === removedProductId){
        each.clicked = false
      }

      return each
    })

    localStorage.setItem("products", JSON.stringify(this.productList))
  }

  nextPage(){
    if(this.loggedIn){
      this.router.navigate(['user/checkout'])
    } else {
      this.router.navigate(['user/login'])
    }
  }
}
