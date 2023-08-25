import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Category } from '../category/category.component';
import { Brand } from '../brand/brand.component';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string; // pending...
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  material: string;
  weight: string;
  dimensions: string;
  images: [];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../../app.component.css'],
})
export class ProductsComponent implements OnInit {
  categories: Category[] = [];
  brands: Brand[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getAllCategory();
    this.getAllBrand();
    this.getAllProduct();
  }

  onProductClick(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(
      (res: any) => {
        this.products = res;
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

  getAllCategory() {
    this.productService.getAllCategory().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

  getAllBrand() {
    this.productService.getAllBrand().subscribe(
      (res: any) => {
        this.brands = res;
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

  getProductByCategory(event: any) {
    const categoryId = event.target.value;

    if (categoryId == 'all') {
      this.getAllProduct();
      return;
    }

    this.productService.getProductByCategory(categoryId).subscribe(
      (res: any) => {
        this.products = res;
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

  getProductByBrand(event: any) {
    const brandId = event.target.value;

    if (brandId == 'all') {
      this.getAllProduct();
      return;
    }

    this.productService.getProductByBrand(brandId).subscribe(
      (res: any) => {
        this.products = res;
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }
}
