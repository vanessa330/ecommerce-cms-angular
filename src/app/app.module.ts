import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CategoryComponent } from './pages/category/category.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePwComponent } from './authentication/change-pw/change-pw.component';
import { ForgotPwComponent } from './authentication/forgot-pw/forgot-pw.component';
import { ResetPwComponent } from './authentication/reset-pw/reset-pw.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { UsersComponent } from './pages/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authReducer } from './store/auth.reducer';
import {
  StoreModule,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { BrandComponent } from './pages/brand/brand.component';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'] })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    NotFoundComponent,
    NavbarComponent,
    CategoryComponent,
    LoginComponent,
    ChangePwComponent,
    ForgotPwComponent,
    ResetPwComponent,
    ProductFormComponent,
    UsersComponent,
    BrandComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forRoot({ auth: authReducer }),
    StoreModule.forRoot({ auth: authReducer }, { metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
