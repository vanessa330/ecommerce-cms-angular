import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Category } from '../category/category.component';
import { Brand } from '../brand/brand.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css', '../../app.component.css'],
})
export class ProductFormComponent implements OnInit {
  private auth = JSON.parse(localStorage.getItem('auth') || '{}');

  categories: Category[] = [];
  brands: Brand[] = [];

  selectedId: number | null = null; // default addProduct()
  selectedName: string = '';
  selectedPrice: number = 0;
  selectedQuantity: number = 0;
  newColor: string = '';
  selectedColor: string[] = [];
  selectedCategory: number = 1;
  selectedBrand: number = 1;
  selectedMaterial: string = '';
  selectedWeight: string = '';
  selectedDimensions: string = '';
  selectedImageIds: number[] = [];

  errorMessage = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllCategory();
    this.getAllBrand();

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId == null) {
      return;
    }
    this.getProductById(productId);
  }

  submitForm(event: Event) {
    event.preventDefault();

    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };
    const body = {
      name: this.selectedName,
      price: this.selectedPrice,
      quantity: this.selectedQuantity,
      color: this.selectedColor.join(', '),
      categoryId: Number(this.selectedCategory),
      brandId: Number(this.selectedBrand),
      material: this.selectedMaterial,
      weight: this.selectedWeight,
      dimensions: this.selectedDimensions,
      imageIds: this.selectedImageIds,
    };

    if (!this.selectedId) {
      this.productService.addNewProduct(body, httpOptions).subscribe(
        (res: any) => {
          alert(res.message);
          this.router.navigate(['/products']);
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
      this.productService.updateProduct(updatedBody, httpOptions).subscribe(
        (res: any) => {
          alert(res.message);
          this.router.navigate(['/products']);
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

  deleteProduct() {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };
    const confirmed = confirm(
      `Are you sure to delete product "${this.selectedName}"?`
    );
    if (!confirmed) return;

    if (this.selectedId) {
      this.productService.deleteProduct(this.selectedId, httpOptions).subscribe(
        (res: any) => {
          alert(res.message);
          this.router.navigate(['/products']);
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

  getProductById(id: any) {
    this.productService.getProductById(id).subscribe(
      (res: any) => {
        this.selectedId = res.id;
        this.selectedName = res.name;
        this.selectedPrice = res.price;
        this.selectedQuantity = res.quantity;
        this.selectedColor = res.color
          .split(',')
          .map((color: string) => color.trim());
        this.selectedCategory = res.categoryId;
        this.selectedBrand = res.brandId;
        this.selectedMaterial = res.material;
        this.selectedWeight = res.weight;
        this.selectedDimensions = res.dimensions;
        this.selectedImageIds = res.images.map((image: any) => image.id);
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

  // image
  uploadImage(fileInput: any) {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };

    this.productService.uploadImage(fileInput.files[0], httpOptions).subscribe(
      (res: any) => {
        this.selectedImageIds.push(res);
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

  deleteImage(imageId: number) {
    const confirmed = confirm('Are you sure you want to delete this image?');
    if (!confirmed) return;

    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };

    this.productService.deleteImage(imageId, httpOptions).subscribe(
      (res: any) => {
        const index = this.selectedImageIds.indexOf(imageId);
        if (index !== -1) {
          this.selectedImageIds.splice(index, 1);
        }
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

  // color
  addColor() {
    if (this.newColor.trim() !== '') {
      this.selectedColor.push(this.newColor.trim());
      this.newColor = '';
    }
  }

  removeColor(color: string) {
    const confirmed = confirm('Are you sure you want to delete this color?');
    if (!confirmed) return;

    const index = this.selectedColor.indexOf(color);
    if (index > -1) {
      this.selectedColor.splice(index, 1);
    }
  }
}
