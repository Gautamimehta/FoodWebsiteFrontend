import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FoodPageComponent } from './food-page/food-page.component';
import {HomeComponent } from './home/home.component';

const routes: Routes = [{
  path:'',
  component: HomeComponent
},
{
  path:'search/:searchTerm',
  component: HomeComponent
},
{
  path:'food-page/:id',
  component: FoodPageComponent
},
{
  path:'cart-page',
  component: CartPageComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
