import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './admin/products/products.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AllProductsComponent } from './client/all-products/all-products.component';
import { CartComponent } from './client/cart/cart.component';
import { LoginComponent } from './client/login/login.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { RegisterComponent } from './client/register/register.component';
import { ConfirmationComponent } from './client/confirmation/confirmation.component';
import { SliderComponent } from './client/slider/slider.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomepageComponent } from './client/homepage/homepage.component';
import { LatestProductsComponent } from './client/latest-products/latest-products.component';
import { ProductListComponent } from './client/product-list/product-list.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductDetailsPageComponent } from './client/product-details-page/product-details-page.component';
import { RelatedProductsComponent } from './client/related-products/related-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    OrdersComponent,
    AllProductsComponent,
    CartComponent,
    LoginComponent,
    CheckoutComponent,
    RegisterComponent,
    ConfirmationComponent,
    SliderComponent,
    HeaderComponent,
    HomepageComponent,
    LatestProductsComponent,
    ProductListComponent,
    FooterComponent,
    ProductDetailsPageComponent,
    RelatedProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
