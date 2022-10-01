import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Products } from 'src/models/Products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: Products[] = [];

  constructor(private apiCall: ApiService) {}

  ngOnInit() {
    let cartStorage: any = localStorage.getItem('cartdetails');
    cartStorage = JSON.parse(cartStorage);

    let productStorage: any = localStorage.getItem('products');
    productStorage = JSON.parse(productStorage);

    if (cartStorage == null || cartStorage.length == 0) {
      localStorage.setItem('cartdetails', JSON.stringify([]));
    }

    if(productStorage == null || productStorage.length == 0){
      this.apiCall.getProductList().subscribe((data) => {
        data.map((each: any) => {
          each['clicked'] = false;
          this.productList.push(each);

          localStorage.setItem('products', JSON.stringify(this.productList));
        });
      });
    } else {
      let productStorage: any = localStorage.getItem('products');
      productStorage = JSON.parse(productStorage);

      this.productList = productStorage
    }
  }

  addToCart(selectedProduct: any) {
    this.productList.map((each: any) => {
      if (each.id === selectedProduct.id) {
        each.clicked = true;
      }
    });

    localStorage.setItem("products", JSON.stringify(this.productList))

    let cart: any = localStorage.getItem('cartdetails');
    cart = JSON.parse(cart);

    cart.push(selectedProduct);

    localStorage.setItem('cartdetails', JSON.stringify(cart));
  }
}
