import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  nameField: string = '';
  contactField: string = '';
  addressField: string = '';
  productIds: any = [];
  purchasedDate: any = '';
  orderList: any = []
  totalAmount: number = 0

  constructor(private apiCall: ApiService) {}

  ngOnInit(): void {
    let orderItems: any = localStorage.getItem('cartdetails');
    orderItems = JSON.parse(orderItems);
    this.orderList = orderItems

    this.productIds = orderItems.map((each: any) => each.id);
    const date = new Date();
    this.purchasedDate = date.toLocaleDateString();
    console.log(date.toLocaleDateString());
    this.totalAmount = orderItems.reduce((acc: any, next: any) => acc + next.price, 0)
  }

  placeOrder() {
    const payload = {
      name: this.nameField,
      contact: this.contactField,
      address: this.addressField,
      ids: this.productIds,
      date: this.purchasedDate,
    };
    this.apiCall.placeOrder(payload).subscribe((data) => {
      console.log(data);
      this.nameField = ""
      this.contactField = ""
      this.addressField = ""
      this.purchasedDate = ""
      this.orderList = []
      this.totalAmount = 0
      localStorage.setItem("cartdetails", JSON.stringify([]))
      alert('Thank You For Your Purchase !')
    })
  }
}
