import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { AllProductsComponent } from './client/all-products/all-products.component';
import { CartComponent } from './client/cart/cart.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { HomepageComponent } from './client/homepage/homepage.component';
import { LoginComponent } from './client/login/login.component';
import { ProductDetailsPageComponent } from './client/product-details-page/product-details-page.component';
import { RegisterComponent } from './client/register/register.component';

const routes: Routes = [
  { path: "admin/products", component: ProductsComponent },
  { path: "admin/products", component: ProductsComponent },
  { path: "", component: HomepageComponent },
  { path: "allproducts", component: AllProductsComponent },
  { path: "user/login", component: LoginComponent },
  { path: "user/register", component: RegisterComponent },
  { path: "user/cart", component: CartComponent },
  { path: "user/checkout", component: CheckoutComponent },
  { path: "product/details/:pid", component: ProductDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }