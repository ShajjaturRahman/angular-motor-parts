import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList: any = []

  constructor(private apiCall: ApiService) { }

  ngOnInit(): void {
    this.apiCall.orderList().subscribe((data: any) => {
      this.orderList = data.list
      console.log(data.list);
      
    })
  }
}
