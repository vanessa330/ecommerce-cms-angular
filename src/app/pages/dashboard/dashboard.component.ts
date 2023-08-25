import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  noOfCategory: number = 0;
  noOfProduct: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getCount();
  }

  getCount() {
    this.productService.getCount().subscribe(
      (res: any) => {
        this.noOfCategory = res.category;
        this.noOfProduct = res.product;
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

}
