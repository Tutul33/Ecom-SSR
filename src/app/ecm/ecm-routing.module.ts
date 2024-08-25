import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  HomeComponent, 
  OrderDetailComponent, 
  OrderTrackComponent, 
  SpecialItemComponent,
  FoodComponent,
  CartComponent,
  CustomizeComponent,
  CheckoutComponent,
  AddressComponent,
  SuccessComponent,
  OrdersComponent,
  ProfileComponent,
  EditprofileComponent,
  StoreAddressComponent,
  EcomComponent,
  BannerItemDisplayComponent
 } from './index';
// import { FoodComponent } from "./food-menu/food-menu.component";
// import { CartComponent } from "./cart/cart.component";
// import { CustomizeComponent } from "./customize/customize.component";
// import { CheckoutComponent } from "./checkout/checkout.component";
// import { AddressComponent } from "./address/address.component";
// import { SuccessComponent } from "./success/success.component";
// import { OrdersComponent } from "./orders/orders.component";
// import { ProfileComponent } from "./profile/profile.component";
// import { EditprofileComponent } from "./edit-profile/edit-profile.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'food-menu', component: FoodComponent },
  { path: 'cart', component: CartComponent },
  { path: 'customize', component: CustomizeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'address', component: AddressComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditprofileComponent },
  { path: 'special-item', component: SpecialItemComponent },
  { path: 'order-track', component: OrderTrackComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'store-address', component: StoreAddressComponent },
  {
    path: 'order-track/:orderid',
    component: OrderTrackComponent
  },
  {
    path: 'ecom/:pageSlug',
    component: EcomComponent
  },
  {
    path: 'banner-item-display/:slug',
    component: BannerItemDisplayComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcmRoutingModule { }

