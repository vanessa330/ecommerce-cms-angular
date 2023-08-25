import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

export interface Brand {
  id: number;
  name: string;
}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css', '../../app.component.css'],
})
export class BrandComponent implements OnInit {
  private auth = JSON.parse(localStorage.getItem('auth') || '{}');
  brands: Brand[] = [];
  selectedId: number | null = null; // default addBrand()
  selectedName: string = '';
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllBrand();
  }

  toggleAddUpdate(id?: number) {
    if (id === undefined) {
      this.selectedId = null;
      this.selectedName = '';
    } else {
      const brand = this.brands.find((c) => c.id === id);
      if (brand) {
        this.selectedId = brand.id;
        this.selectedName = brand.name;
      } else {
        this.selectedId = null;
        this.selectedName = '';
      }
    }
  }

  submitForm(event: Event) {
    event.preventDefault();

    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };
    const body = { name: this.selectedName };

    if (!this.selectedId) {
      this.productService.addNewBrand(body, httpOptions).subscribe(
        (res: any) => {
          alert(res.message);
          this.selectedName = '';
          this.getAllBrand();
        },
        (err: any) => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      );
    } else {
      const updatedBody = { ...body, id: this.selectedId };

      this.productService.updateBrand(updatedBody, httpOptions).subscribe(
        (res: any) => {
          alert(res.message);
          this.getAllBrand();
        },
        (err: any) => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      );
    }
  }

  deleteBrand() {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };
    const confirmed = confirm(
      `Are you sure to delete brand ${this.selectedName}?`
    );
    if (!confirmed) return;

    this.productService.deleteBrand(this.selectedId, httpOptions).subscribe(
      (res: any) => {
        alert(res.message);
        window.location.reload();
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
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
}
