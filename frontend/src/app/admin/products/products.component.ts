import { Component, OnInit } from '@angular/core';
import { Products } from 'src/models/Products';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedProductId: any = undefined;
  userTypedProductName: String = '';
  userTypedProductPrice: any = undefined;
  userTypedProductStock: any = undefined;
  productImageFile: any = "";
  updateStatus: any = false;
  productList: Products[] = [];

  constructor(private apiCall: ApiService) {}

  ngOnInit() {
    this.apiCall.getProductList().subscribe((data) => {
      this.productList = data;
    });
  }

  getProductImageDetails(event: any){
    this.productImageFile = event.target.files[0]
  }

  addProduct() {
    if (this.userTypedProductName !== '' && this.userTypedProductPrice !== '') {
      this.apiCall.uploadImage(this.productImageFile).subscribe((data: any) => {
        const payload = {
          name: this.userTypedProductName,
          price: this.userTypedProductPrice,
          stock: this.userTypedProductStock,
          image: data.location
        };

        this.apiCall.addProduct(payload).subscribe((data) => {
          console.log(data);
          this.ngOnInit();
        });

        this.userTypedProductName = '';
        this.userTypedProductPrice = '';
        this.userTypedProductStock = "";
        this.productImageFile = ""
      })
    }
  }

  changeUpdateStatus(selectedProduct: any) {
    this.updateStatus = !this.updateStatus;

    this.userTypedProductName = selectedProduct.name;
    this.userTypedProductPrice = selectedProduct.price;
    this.userTypedProductStock = selectedProduct.stock;
    this.selectedProductId = selectedProduct.id;
  }

  updateProduct() {
    const payload = {
      id: this.selectedProductId,
      name: this.userTypedProductName,
      price: this.userTypedProductPrice,
      stock: this.userTypedProductStock
    };

    this.apiCall.updateProduct(payload).subscribe((data) => {
      console.log(data);
      this.updateStatus = !this.updateStatus
      this.ngOnInit();
    });

    this.userTypedProductName = '';
    this.userTypedProductPrice = '';
    this.userTypedProductStock = '';
  }

  deleteProduct(id: any) {
    this.apiCall.deleteProduct(id).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }

}
