
import { NgModule } from '@angular/core';
import { EcmRoutingModule } from './ecm-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
// import { AgmCoreModule } from '@agm/core';

import {
  ApiService,
  HomeComponent,
  FoodComponent,
  CartComponent,
  CustomizeComponent,
  CheckoutComponent,
  AddressComponent,
  SuccessComponent,
  OrdersComponent,
  ProfileComponent,
  EditprofileComponent,
  BannerComponent,
  SpecialItemComponent,
  AddonsComponent,
  OrderTypeComponent,
  SpicyOptionComponent,
  ChooseUnitComponent,
  ItemComponent,
  OrderListComponent,
  OrderDetailComponent,
  OrderTrackComponent,
  AddressModalComponent,
  StoreAddressComponent,
  EcomComponent,
  BannerItemDisplayComponent,
  StoreAddressDetailComponent,
  SwipeModalComponent,
  SwipeModalChangeComponent,
  SwipeModalUpdateComponent,
  SwipeModalSpicyComponent,
  PointHistoryModalComponent,
  CouponComponent,
  RedeemPointsComponent
} from './index';



@NgModule({
  declarations: [
    HomeComponent,
    FoodComponent,
    CartComponent,
    CustomizeComponent,
    CheckoutComponent,
    AddressComponent,
    SuccessComponent,
    OrdersComponent,
    ProfileComponent,
    EditprofileComponent,
    BannerComponent,
    SpecialItemComponent,
    AddonsComponent,
    OrderTypeComponent,
    SpicyOptionComponent,
    ChooseUnitComponent,
    ItemComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderTrackComponent,
    AddressModalComponent,
    StoreAddressComponent,
    EcomComponent,
    BannerItemDisplayComponent,
    StoreAddressDetailComponent,
    SwipeModalComponent,
    SwipeModalChangeComponent,
    SwipeModalUpdateComponent,
    SwipeModalSpicyComponent,
    PointHistoryModalComponent,
    CouponComponent,
    RedeemPointsComponent
  ],
  imports: [
    EcmRoutingModule,
    SharedModule,
    AppSharedModule,
    InputNumberModule,
    CalendarModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "initialKey",
    //   libraries: ['places'],
    // }),
  ],
  exports: [
    AddonsComponent,
    OrderTypeComponent
  ],
  providers: [ApiService]
})
export class EcmModule { }


