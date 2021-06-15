import { ProductResolver } from './../product.resolver';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MaterialModule } from '../shared/material.module';
import { MobileComponent } from '../mobile/mobile.component';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { TvComponent } from '../tv/tv.component';
import { KitchenDetailsComponent } from '../kitchen-details/kitchen-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TvDetailsComponent } from '../tv-details/tv-details.component';
import { MobileDetailsComponent } from '../mobile-details/mobile-details.component';


const routes : Routes = [
   { path: '', component: ProductsComponent },
   { path: 'kitchen', component: KitchenComponent },
   { path: 'kitchen/:id', component: KitchenDetailsComponent },
   { path: 'tvs', component: TvComponent },
   { path: 'tvs/:id', component: TvDetailsComponent },
   { path: 'mobile', component: MobileComponent , resolve :{mobileData : ProductResolver}},
   { path: 'mobile/:id', component: MobileDetailsComponent }


]
@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    MobileComponent,
    KitchenComponent,
    TvComponent,
    KitchenDetailsComponent,
    TvDetailsComponent,
    MobileDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers : [
    ProductResolver
  ]
})
export class SouqModule { }
