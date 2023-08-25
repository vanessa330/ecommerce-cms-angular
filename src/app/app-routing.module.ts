import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './authentication/login/login.component';
import { CategoryComponent } from './pages/category/category.component';
import { ChangePwComponent } from './authentication/change-pw/change-pw.component';
import { ForgotPwComponent } from './authentication/forgot-pw/forgot-pw.component';
import { ResetPwComponent } from './authentication/reset-pw/reset-pw.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { UsersComponent } from './pages/users/users.component';
import { BrandComponent } from './pages/brand/brand.component';

const routes: Routes = [
  // authentication routes
  { path: '', component: LoginComponent }, // login & signup
  { path: 'changePassword', component: ChangePwComponent },
  { path: 'forgotPassword', component: ForgotPwComponent },
  { path: 'resetPassword/:oneTimeToken', component: ResetPwComponent },
  // product routes
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'brand', component: BrandComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductFormComponent },

  { path: 'product/add', component: ProductFormComponent },
  // user setting routes
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
