import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

export interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css', '../../app.component.css'],
})
export class CategoryComponent implements OnInit {
  private auth = JSON.parse(localStorage.getItem('auth') || '{}');
  categories: Category[] = [];
  selectedId: number | null = null; // default addCategory()
  selectedName: string = '';
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllCategory();
  }

  toggleAddUpdate(id?: number) {
    if (id === undefined) {
      this.selectedId = null;
      this.selectedName = '';
    } else {
      const category = this.categories.find((c) => c.id === id);
      if (category) {
        this.selectedId = category.id;
        this.selectedName = category.name;
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
      this.productService.addNewCategory(body, httpOptions).subscribe(
        (res: any) => {
          alert(res.message);
          this.selectedName = "";
          this.getAllCategory();
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

      this.productService.updateCategory(updatedBody, httpOptions).subscribe(
        (res: any) => {
          alert(res.message);
          this.getAllCategory();
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

  deleteCategory() {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };
    const confirmed = confirm(
      `Are you sure to delete category ${this.selectedName}?`
    );
    if (!confirmed) return;

    this.productService.deleteCategory(this.selectedId, httpOptions).subscribe(
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
}
